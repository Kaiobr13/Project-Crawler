create user 'mqtt_app'@'localhost' identified by 'MQtt1234!';

grant select, insert, update, delete on crawler_iot.* to 'mqtt_app'@'localhost';

flush privileges;

create table devices(
	device_id int not null auto_increment primary key,
    device_name varchar (255),
    device_type ENUM ('vehicle', 'sensor'),										-- vehicle/sensor
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table activity_log(
	activitylog_id int auto_increment primary key not null,				
	device_id int not null,											-- identifies the source (sensor/vehicle) 
    speed float,													-- in km/h or m/s
    distance float,													-- in meters or km
    duration_seconds int,											-- time spent on the track
    weight_g float,												    -- weigth carried in g
    topic varchar(255),												-- MQTT topic
    raw_payload TEXT,												-- original MQTT message (maybe used for debug)
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sensor_data (
    sd_id INT AUTO_INCREMENT PRIMARY KEY,
    device_id int not null,
    sensor VARCHAR(100),
    value FLOAT,
    topic VARCHAR(255),
    received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mqtt_connection_log (
    conlog_id INT AUTO_INCREMENT PRIMARY KEY,
    event_type ENUM('connect', 'disconnect', 'reconnect', 'error'),
    message TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Foreign Keys

alter table activity_log
add constraint devices_fk_activity_log
foreign key (device_id) references devices(device_id) 
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table sensor_data
add constraint devices_fk_sensor_data
foreign key (device_id) references devices(device_id) 
ON DELETE NO ACTION ON UPDATE NO ACTION;