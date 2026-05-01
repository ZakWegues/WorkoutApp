import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { level, goal } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
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
            content: `Você é um especialista em calistenia e treinamento com peso corporal.
Crie treinos EXCLUSIVAMENTE com exercícios de calistenia (sem equipamentos ou apenas barra fixa).
Foque em progressões: do mais fácil para o mais difícil.
Para iniciantes: fundamentos (flexão, agachamento, prancha, remada australiana).
Para intermediários: barra, flexão diamante, pistol squat, L-sit.
Para avançados: muscle-up, handstand, dragon flag, planche progressions.
Sempre explique as progressões e como evoluir.
Responda APENAS em JSON válido sem texto fora do JSON.
Estrutura do JSON:
{
  "name": "Nome do Treino",
  "description": "Descrição breve",
  "exercises": [
    { "name": "Nome em Inglês", "sets": 3, "reps": 10, "rest": 60 }
  ]
}`
          },
          {
            role: 'user',
            content: `Gere um treino para nível ${level} com objetivo de ${goal}.`
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Attempt to parse JSON
    try {
      const workout = JSON.parse(content);
      return NextResponse.json(workout);
    } catch (e) {
      console.error('Failed to parse IA response as JSON:', content);
      return NextResponse.json({ error: 'Falha ao gerar treino estruturado.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Generate Workout API Error:', error);
    return NextResponse.json({ error: 'Erro ao gerar treino.' }, { status: 500 });
  }
}
