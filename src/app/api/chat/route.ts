import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error('GROQ_API_KEY is not defined in environment variables');
      return NextResponse.json({ error: 'Configuração da IA ausente.' }, { status: 500 });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'Você é Coach, especialista em calistenia e peso corporal. Responda sempre em português brasileiro de forma motivadora e direta. Foque em progressões de calistenia, mobilidade e fundamentos do movimento. Quando sugerir exercícios, use os nomes em inglês entre parênteses após o nome em português. Limite respostas a 3 parágrafos curtos e objetivos.'
          },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API Error:', errorData);
      return NextResponse.json({ error: 'Erro ao processar sua solicitação com a IA.' }, { status: response.status });
    }

    // Proxy the stream
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream' },
    });

  } catch (error) {
    console.error('Chat API Detailed Error:', error);
    return NextResponse.json({ error: 'Erro interno no servidor do Coach.' }, { status: 500 });
  }
}
