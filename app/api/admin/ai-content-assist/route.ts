import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, contentType, title, content, description, currentSeo } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    if (!title || (!content && type === 'content')) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let prompt = '';
    let systemPrompt = '';

    if (type === 'seo') {
      systemPrompt = `You are an SEO expert for Ko Lake Villa, a luxury lakeside accommodation in Sri Lanka. Generate SEO-optimized meta content that will help attract guests searching for luxury villas, lakeside accommodations, and Sri Lankan vacation rentals. Focus on high-value keywords that drive bookings.

Always respond with JSON in this exact format:
{
  "metaTitle": "string (50-60 characters, include Ko Lake Villa)",
  "metaDescription": "string (150-160 characters, compelling and action-oriented)",
  "keywords": ["array", "of", "relevant", "seo", "keywords"]
}`;

      prompt = `Content Type: ${contentType}
Title: ${title}
Content: ${content || 'Not provided'}
Description: ${description || 'Not provided'}

Current SEO:
- Meta Title: ${currentSeo?.metaTitle || 'None'}
- Meta Description: ${currentSeo?.metaDescription || 'None'}
- Keywords: ${currentSeo?.keywords?.join(', ') || 'None'}

Generate improved SEO meta data for this Ko Lake Villa content. Focus on:
- Luxury accommodation keywords
- Sri Lankan location appeal
- Guest experience benefits
- Direct booking incentives
- Local attractions and amenities`;

    } else if (type === 'content') {
      systemPrompt = `You are a luxury hospitality content writer for Ko Lake Villa in Sri Lanka. Enhance content to be more engaging, professional, and appealing to luxury travelers. Focus on the unique lakeside experience, Sri Lankan culture, and premium amenities.

Always respond with JSON in this exact format:
{
  "improvedContent": "string (enhanced version of the content)",
  "subtitle": "string (optional engaging subtitle)",
  "description": "string (optional compelling description)"
}`;

      prompt = `Content Type: ${contentType}
Title: ${title}
Current Content: ${content}
Current Description: ${description || 'Not provided'}

Enhance this content to be more engaging and luxury-focused for Ko Lake Villa guests. Make it:
- More compelling and descriptive
- Focus on unique luxury experiences
- Highlight Sri Lankan cultural elements
- Emphasize the lakeside setting
- Appeal to affluent travelers
- Professional hospitality tone`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-5", // CRITICAL: Using GPT-5 as required by user specifications - do not change
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000,
    });

    const result = completion.choices[0].message.content;
    if (!result) {
      throw new Error('No response from AI');
    }

    const parsedResult = JSON.parse(result);
    
    return NextResponse.json(parsedResult);

  } catch (error) {
    console.error('AI Content Assist error:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI content assistance' },
      { status: 500 }
    );
  }
}