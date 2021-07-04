import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, message, Layout, Menu } from 'antd';
import PaginaPadrao from '../../components/PaginaPadrao/PaginaPadrao';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TagService from '../../service/TagService';

const { Header, Content } = Layout;
const { Column } = Table;

const ListarTags = () => {
  const [listaTags, setListaTags] = useState([]);

  useEffect(() => {
    refreshTags();
    return () => {};
  }, []);

  const refreshTags = async () => {
    TagService.retrieveAllTags().then((response) => {
      setListaTags(response.data);
    });
    console.log(listaTags);
  };

  const remove = async (record) => {
    await TagService.deleteTag(record._id);
    refreshTags();
    message.success('Tag removida com sucesso!', 2);
  };

  return (
    <>
      <PaginaPadrao titulo="Listar Tags" selecionado="4">
        <Table dataSource={listaTags} rowKey="_id" bordered={true}>
          <Column
            width="95%"
            title="Descrição"
            dataIndex="descricao"
            key="descricao"
          />
          <Column
            title="Remover"
            key="atualizar"
            render={(text, record) => (
              <Button danger onClick={() => remove(record)}>
                Remover
              </Button>
            )}
            type="primary"
          />
        </Table>
      </PaginaPadrao>
    </>
  );
};

export default ListarTags;
