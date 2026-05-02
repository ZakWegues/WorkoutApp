DELETE FROM exercises;

INSERT INTO exercises (name, muscle_group, secondary_muscles, equipment, difficulty, instructions) VALUES
-- PEITO (chest)
('Push-up', 'chest', ARRAY['triceps', 'shoulders'], 'bodyweight', 'beginner', 'Mãos no chão na largura dos ombros, desça o peito até quase tocar o chão e empurre de volta'),
('Wide Push-up', 'chest', ARRAY['triceps', 'shoulders'], 'bodyweight', 'beginner', 'Mãos mais abertas que os ombros, foca mais no peitoral'),
('Diamond Push-up', 'chest', ARRAY['triceps'], 'bodyweight', 'intermediate', 'Mãos formando um losango sob o peito, foca no tríceps e peitoral interno'),
('Archer Push-up', 'chest', ARRAY['triceps', 'shoulders'], 'bodyweight', 'intermediate', 'Uma mão estendida ao lado enquanto o outro braço faz o movimento'),
('Pseudo Planche Push-up', 'chest', ARRAY['shoulders', 'triceps'], 'bodyweight', 'advanced', 'Mãos apontadas para trás na altura do quadril, corpo inclinado para frente'),
('Pike Push-up', 'shoulders', ARRAY['triceps', 'chest'], 'bodyweight', 'beginner', 'Quadril elevado formando um V, desça a cabeça em direção ao chão'),

-- COSTAS (back)
('Australian Pull-up', 'back', ARRAY['biceps'], 'bodyweight', 'beginner', 'Deitado sob uma barra baixa, puxe o peito até a barra'),
('Pull-up', 'back', ARRAY['biceps', 'shoulders'], 'bodyweight', 'intermediate', 'Pegada pronada na barra, puxe até o queixo passar da barra'),
('Chin-up', 'back', ARRAY['biceps'], 'bodyweight', 'intermediate', 'Pegada supinada na barra, puxe até o queixo passar da barra'),
('Archer Pull-up', 'back', ARRAY['biceps', 'shoulders'], 'bodyweight', 'advanced', 'Um braço estendido enquanto o outro puxa o corpo'),
('Muscle-up', 'back', ARRAY['chest', 'triceps', 'shoulders'], 'bodyweight', 'advanced', 'Puxe explosivamente e passe os cotovelos acima da barra'),
('L-sit Pull-up', 'back', ARRAY['core', 'biceps'], 'bodyweight', 'advanced', 'Pull-up com as pernas estendidas à frente em L'),

-- PERNAS (legs)
('Squat', 'legs', ARRAY['core'], 'bodyweight', 'beginner', 'Pés na largura dos ombros, desça como se fosse sentar numa cadeira'),
('Jump Squat', 'legs', ARRAY['core'], 'bodyweight', 'beginner', 'Agachamento com salto explosivo no final'),
('Bulgarian Split Squat', 'legs', ARRAY['core'], 'bodyweight', 'intermediate', 'Um pé elevado atrás, desça com a perna da frente'),
('Pistol Squat', 'legs', ARRAY['core'], 'bodyweight', 'advanced', 'Agachamento unilateral com uma perna estendida à frente'),
('Shrimp Squat', 'legs', ARRAY['core'], 'bodyweight', 'advanced', 'Agachamento unilateral com a perna de trás dobrada atrás'),
('Nordic Curl', 'legs', ARRAY[]::text[], 'bodyweight', 'advanced', 'Joelhos no chão, desça o corpo controladamente com os isquiotibiais'),

-- OMBROS (shoulders)
('Handstand Push-up', 'shoulders', ARRAY['triceps', 'core'], 'bodyweight', 'advanced', 'Em posição de parada de mão contra a parede, desça a cabeça até o chão'),
('Wall Handstand Hold', 'shoulders', ARRAY['core', 'triceps'], 'bodyweight', 'intermediate', 'Segure a parada de mão contra a parede pelo tempo determinado'),
('Freestanding Handstand', 'shoulders', ARRAY['core', 'triceps'], 'bodyweight', 'advanced', 'Parada de mão sem apoio, foco em equilíbrio'),

-- BRAÇOS (arms)
('Close Push-up', 'arms', ARRAY['chest'], 'bodyweight', 'beginner', 'Mãos próximas sob o peito, foca no tríceps'),
('Tricep Dip', 'arms', ARRAY['chest', 'shoulders'], 'bodyweight', 'beginner', 'Mãos em superfície elevada atrás, desça e suba com os tríceps'),
('Commando Pull-up', 'arms', ARRAY['back', 'shoulders'], 'bodyweight', 'intermediate', 'Pegada neutra paralela, alterne o lado que o queixo passa'),

-- CORE (core)
('Plank', 'core', ARRAY[]::text[], 'bodyweight', 'beginner', 'Apoio nos antebraços e pontas dos pés, mantenha o corpo reto'),
('Ab Wheel Rollout', 'core', ARRAY['shoulders'], 'bodyweight', 'intermediate', 'Com a roda abdominal, estenda o corpo para frente e volte'),
('Toes to Bar', 'core', ARRAY[]::text[], 'bodyweight', 'intermediate', 'Pendurado na barra, suba os pés até tocar a barra'),

-- BARRA (barbell)
('Supino Reto', 'chest', ARRAY['triceps', 'shoulders'], 'barbell', 'intermediate', 'Deitado no banco, desça a barra até o peito e empurre'),
('Agachamento Livre', 'legs', ARRAY['core'], 'barbell', 'intermediate', 'Barra nas costas, agache mantendo a coluna neutra'),
('Levantamento Terra', 'back', ARRAY['legs', 'core'], 'barbell', 'advanced', 'Tire a barra do chão estendendo o quadril e joelhos'),
('Desenvolvimento Militar', 'shoulders', ARRAY['triceps'], 'barbell', 'intermediate', 'Empurre a barra acima da cabeça estando de pé'),

-- HALTERE (dumbbell)
('Supino inclinado com Halteres', 'chest', ARRAY['triceps'], 'dumbbell', 'intermediate', 'Banco inclinado, use halteres para maior amplitude'),
('Remada Unilateral', 'back', ARRAY['biceps'], 'dumbbell', 'beginner', 'Apoiado no banco, puxe o haltere lateralmente'),
('Crossover com Halteres', 'chest', ARRAY[]::text[], 'dumbbell', 'intermediate', 'Movimento de abraço com halteres deitado no banco'),
('Rosca Direta com Halteres', 'arms', ARRAY['biceps'], 'dumbbell', 'beginner', 'Flexão de cotovelo com halteres'),

-- MÁQUINA (machine)
('Leg Press 45', 'legs', ARRAY[]::text[], 'machine', 'beginner', 'Empurre a plataforma com as pernas no ângulo de 45 graus'),
('Cadeira Extensora', 'legs', ARRAY[]::text[], 'machine', 'beginner', 'Extensão de joelhos sentada na máquina'),
('Puxada Frontal', 'back', ARRAY['biceps'], 'machine', 'beginner', 'Puxe a barra da máquina de polia alta até o peito'),
('Peck Deck', 'chest', ARRAY[]::text[], 'machine', 'beginner', 'Aproxime os braços na frente do peito na máquina');
