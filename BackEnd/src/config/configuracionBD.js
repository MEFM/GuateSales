const oracledb = require('oracledb');


cns = {
    user: "TEST",
    password: "1234",
    connectString: "172.17.0.2:1521/ORCL18"
}


async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, { autoCommit }); // SQL: COnsulta, Binds: Sepa la verga, {AutoCommit}: Refresca Tab Tmp
    cnn.release();
    return result;
}

exports.Open = Open;
