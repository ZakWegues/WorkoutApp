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
('Hollow Body Hold', 'core', ARRAY[]::text[], 'bodyweight', 'beginner', 'Deitado, lombar pressionada no chão, pernas e braços elevados'),
('L-sit', 'core', ARRAY['arms'], 'bodyweight', 'intermediate', 'Apoio nas mãos, pernas estendidas à frente paralelas ao chão'),
('Dragon Flag', 'core', ARRAY[]::text[], 'bodyweight', 'advanced', 'Apoiado num banco, suba e desça o corpo reto como uma bandeira'),
('Ab Wheel Rollout', 'core', ARRAY['shoulders'], 'bodyweight', 'intermediate', 'Com a roda abdominal, estenda o corpo para frente e volte'),
('Hanging Knee Raise', 'core', ARRAY[]::text[], 'bodyweight', 'beginner', 'Pendurado na barra, suba os joelhos até o peito'),
('Toes to Bar', 'core', ARRAY[]::text[], 'bodyweight', 'intermediate', 'Pendurado na barra, suba os pés até tocar a barra');
