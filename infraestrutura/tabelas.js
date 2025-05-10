class tabelas {
  init(conexao) {
    this.conexao = conexao;
    this.criarDispositivos();
    this.criarAtividades();
    this.criarSensores();
    this.criarLogs();
  }

  criarDispositivos() {
    const sql = `
        create table if not exists devices(
	    device_id int not null auto_increment primary key,
        device_name varchar (255),
        device_type ENUM ('vehicle', 'sensor'),										
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    this.conexao.query(sql, (error) => {
        if(error){
            console.log("Erro ao criar tabela de dispositivos");
            console.log(error.message);
            return;
        }
        console.log("Tabela de dispositivos já criada/criada com sucesso");
    });
  }

  criarAtividades() {
    const sql = `
        create table if not exists activity_log(
	    activitylog_id int auto_increment primary key not null,				
	    device_id int not null,										
        speed float,												
        distance float,												
        duration_seconds int,										
        weight_g float,												   
        topic varchar(255),											
        raw_payload TEXT,											
        recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    this.conexao.query(sql, (error) => {
        if(error){
            console.log("Erro ao criar tabela de atividades");
            console.log(error.message);
            return;
        }
        console.log("Tabela de atividades já criada/criada com sucesso");
    })
  }

  criarSensores(){
    const sql = `
        create table if not exists sensor_data (
        sd_id INT AUTO_INCREMENT PRIMARY KEY,
        device_id int not null,
        sensor VARCHAR(100),
        value FLOAT,
        topic VARCHAR(255),
        received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );         
    `;

    this.conexao.query(sql, (error) => {
        if(error){
            console.log("Erro ao criar tabela de sensores");
            console.log(error.message);
            return;
        }
        console.log("Tabela de sensores já criada/criada com sucesso");
    });
  }
  criarLogs(){
    const sql = `
        create table if not exists mqtt_connection_log (
        conlog_id INT AUTO_INCREMENT PRIMARY KEY,
        event_type ENUM('connect', 'disconnect', 'reconnect', 'error'),
        message TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    this.conexao.query(sql, (error) => {
        if(error){
            console.log("Erro ao criar tabela de logs");
            console.log(error.message);
            return;
        }
        console.log("Tabela de logs já criada/criada com sucesso");
    });
  }
}

module.exports = new tabelas();