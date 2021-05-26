const connection = require("../app/database");

class MomentService {
  async create(userId, content) {
    const statement = "INSERT INTO moment (content, user_id) VALUES (?, ?);";
    const result = await connection.execute(statement, [content, userId]);
    return result[0];
  }

  async getMomentById(momentId) {
    const statement = `
    
SELECT 
m.id id, m.content content, m.create_at createTime, m.update_at updateTime,
JSON_OBJECT('id', u.id, 'name', u.name) user,
IF(COUNT(c.id),JSON_ARRAYAGG(
	JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
							'users', JSON_OBJECT('id', cu.id, 'name', cu.name)
	)
),NULL) comments,
JSON_ARRAYAGG(
	JSON_OBJECT('id', l.id, 'name', l.name)
) labels
FROM moment m
LEFT JOIN users u ON m.user_id = u.id
LEFT JOIN comment c ON c.moment_id = m.id
LEFT JOIN users cu ON c.user_id = cu.id
LEFT JOIN moment_label ml ON m.id = ml.moment_id
LEFT JOIN label l ON l.id = ml.label_id
WHERE m.id = ?
GROUP BY m.id;
    `;
    const [result] = await connection.execute(statement, [momentId]);
    return result[0];
  }

  async getMomentList(offset, size) {
    const statement = `
    SELECT 
    m.id id, m.content content, m.create_at createTime, m.update_at updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name) user,
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
    (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount 
  FROM moment m
  LEFT JOIN users u
  ON m.user_id = u.id
  LIMIT ?, ?;
    `;

    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }

  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result[0] ? true : false;
  }

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?)`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new MomentService();
