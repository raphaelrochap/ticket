import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Divider } from 'antd';
const { Column } = Table;

const TabelaTickets = (props) => {
  return (
    <Table
      dataSource={props.lista}
      rowKey="_id"
      bordered={true}
      expandable={{
        expandedRowRender: (record) =>
          record.tags.map((tag) => {
            return <p style={{ margin: 5 }}>{tag.descricao}</p>;
          }),
        rowExpandable: (record) => record.name !== 'Not Expandable',
      }}
    >
      <Column title="Assunto" dataIndex="assunto" key="assunto" />
      <Column width="20%" title="Criador" dataIndex="criador" key="criador" />
      <Column
        width="5%"
        title=""
        key="vizualizar"
        render={(text, record) => (
          <Button onClick={() => props.vizualizar(record)}>Vizualizar</Button>
        )}
        type="primary"
      />
      <Column
        width="5%"
        title=""
        key="remover"
        render={(text, record) => (
          <div style={{ margin: 5 }}>
            <Button danger onClick={() => props.remove(record)}>
              Remover
            </Button>
          </div>
        )}
        type="primary"
      />
    </Table>
  );
};

export default TabelaTickets;
