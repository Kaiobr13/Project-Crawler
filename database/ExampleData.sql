insert into devices (device_name, device_type) values
('Crawler - Com carga', 'vehicle'),
('Crawler - Sem carga', 'vehicle'),
('Sensor de Temperatura 01', 'sensor'),
('Sensor de Vibração 01', 'sensor');

insert into activity_log (device_id, speed, distance, duration_seconds, weight_g, topic, raw_payload) values
(1, 60, 5, 240, 500.0, 'veiculo/comcarga/activity', '{"speed":60,"distance":5,"duration":240,"weight":500}'),
(2, 75, 5, 180, 0, 'veiculo/semcarga/activity', '{"speed":75,"distance":5,"duration":180,"weight":0}'),
(2, 55, 5, 300, 0, 'veiculo/semcarga/activity', '{"speed":55,"distance":5,"duration":300,"weight":0}');

insert into sensor_data (device_id, sensor, value, topic) values
(3, 'temperatura', 36.7, 'sensor/temp01/data'),
(3, 'temperatura', 37.2, 'sensor/temp01/data'),
(4, 'vibracao', 0.89, 'sensor/vib01/data'),
(4, 'vibracao', 1.05, 'sensor/vib01/data');