import * as mysql from 'mysql2/promise';

export const MYSQL_FACTORY = 'MYSQL_FACTORY';

export function MysqlFactory(options) {
  const pool = mysql.createPool(options);
  return pool;
}
