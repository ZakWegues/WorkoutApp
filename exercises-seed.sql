DELETE FROM exercises;

INSERT INTO exercises (name, muscle_group, secondary_muscles, equipment, difficulty, instructions) VALUES
-- PUSH (Empurrar) - PROGRESSÕES
('Flexão de Joelhos', 'chest', ARRAY['triceps', 'shoulders'], 'bodyweight', 'beginner', 'Apoie os joelhos no chão, mantenha o tronco reto e desça o peito.'),
('Flexão Inclinada', 'chest', ARRAY['triceps', 'shoulders'], 'bodyweight', 'beginner', 'Mãos em uma superfície elevada (banco/mesa). Mais fácil que a flexão no chão.'),
('Flexão Padrão', 'chest', ARRAY['triceps', 'shoulders'], 'bodyweight', 'intermediate', 'Corpo reto, mãos na largura dos ombros. Desça até quase tocar o chão.'),
('Flexão Diamante', 'chest', ARRAY['triceps'], 'bodyweight', 'intermediate', 'Mãos juntas formando um diamante. Foco intenso no tríceps.'),
('Flexão Arqueiro', 'chest', ARRAY['triceps', 'shoulders'], 'bodyweight', 'advanced', 'Afaste as mãos e desça alternando o peso para cada braço.'),
('Flexão Explosiva (Clap)', 'chest', ARRAY['triceps'], 'bodyweight', 'advanced', 'Empurre com força total para tirar as mãos do chão e bater palma.'),
('Flexão de um Braço', 'chest', ARRAY['core', 'triceps'], 'bodyweight', 'advanced', 'Pés afastados para equilíbrio, desça usando apenas um braço.'),

-- PULL (Puxar) - PROGRESSÕES
('Remada Australiana (Barra Baixa)', 'back', ARRAY['biceps'], 'bodyweight', 'beginner', 'Barra na altura do peito, corpo inclinado, puxe o peito até a barra.'),
('Dead Hang (Suspensão)', 'back', ARRAY['arms'], 'bodyweight', 'beginner', 'Apenas segure-se na barra pelo tempo determinado para fortalecer a pegada.'),
('Barra Fixa Negativa', 'back', ARRAY['biceps'], 'bodyweight', 'intermediate', 'Pule para o topo e desça o mais devagar possível.'),
('Barra Fixa (Pull-up)', 'back', ARRAY['biceps', 'shoulders'], 'bodyweight', 'intermediate', 'Puxe o queixo acima da barra com pegada pronada.'),
('Chin-up (Pegada Supinada)', 'back', ARRAY['biceps'], 'bodyweight', 'intermediate', 'Puxe o queixo acima da barra com as palmas voltadas para você.'),
('Barra Arqueiro', 'back', ARRAY['biceps'], 'bodyweight', 'advanced', 'Puxe o corpo para um lado de cada vez mantendo o outro braço esticado.'),
('Muscle-up', 'back', ARRAY['chest', 'triceps'], 'bodyweight', 'advanced', 'Puxe explosivamente e faça a transição para o mergulho acima da barra.'),

-- PERNAS - PROGRESSÕES
('Agachamento Livre', 'legs', ARRAY['core'], 'bodyweight', 'beginner', 'Pés na largura dos ombros, desça como se fosse sentar.'),
('Afundo (Lunge)', 'legs', ARRAY['core'], 'bodyweight', 'beginner', 'Dê um passo à frente e desça o joelho de trás até quase tocar o chão.'),
('Agachamento Búlgaro', 'legs', ARRAY['core'], 'bodyweight', 'intermediate', 'Um pé elevado atrás no banco, desça com a perna da frente.'),
('Cossack Squat', 'legs', ARRAY['core'], 'bodyweight', 'intermediate', 'Agachamento lateral profundo alternando os lados.'),
('Pistol Squat (Unilateral)', 'legs', ARRAY['core'], 'bodyweight', 'advanced', 'Agachamento com apenas uma perna enquanto a outra fica esticada à frente.'),
('Shrimp Squat', 'legs', ARRAY['core'], 'bodyweight', 'advanced', 'Agachamento unilateral segurando o pé de trás com a mão.'),

-- OMBROS / VERTICAL
('Pike Push-up', 'shoulders', ARRAY['triceps'], 'bodyweight', 'beginner', 'Quadril alto em V, desça a cabeça à frente das mãos.'),
('Elevated Pike Push-up', 'shoulders', ARRAY['triceps'], 'bodyweight', 'intermediate', 'Pés em um banco para aumentar a carga nos ombros.'),
('Wall Handstand Hold', 'shoulders', ARRAY['core'], 'bodyweight', 'intermediate', 'Parada de mão contra a parede para fortalecer os ombros.'),
('Handstand Push-up (HSPU)', 'shoulders', ARRAY['triceps'], 'bodyweight', 'advanced', 'Flexão em parada de mão contra a parede.'),

-- ACADEMIA (Pesos)
('Supino com Barra', 'chest', ARRAY['triceps'], 'barbell', 'intermediate', 'Exercício clássico de empurrar no banco horizontal.'),
('Levantamento Terra', 'back', ARRAY['legs', 'core'], 'barbell', 'advanced', 'Tirar a carga pesada do chão mantendo a postura perfeita.'),
('Rosca Direta', 'arms', ARRAY['biceps'], 'barbell', 'beginner', 'Flexão de cotovelo para isolar o bíceps.'),
('Leg Press', 'legs', ARRAY[]::text[], 'machine', 'beginner', 'Empurrar a plataforma da máquina com as pernas.'),
('Puxada no Pulley', 'back', ARRAY['biceps'], 'machine', 'beginner', 'Simulação de barra fixa na polia alta.');
