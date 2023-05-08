import {
  HomeOutlined,
  ReadOutlined,
  ProfileOutlined,
  FileOutlined,
  UserOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  EditOutlined,
  StockOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const menuList = [
  {
    title: "Inicio",
    key: "/admin",
    icon: <HomeOutlined />,
  },
  {
    title: "Gestión de Usuarios",
    key: "1",
    icon: <UserOutlined />,
    children: [
      {
        title: "Usuario",
        key: "/admin/usuario",
        icon: <TeamOutlined />,
      },
      {
        title: "Cliente",
        key: "/admin/cliente",
        icon: <UsergroupAddOutlined />,
      },
      {
        title: "Rol",
        key: "/admin/rol",
        icon: <EditOutlined />,
      },
    ],
  },
  {
    title: "Gestión de Productos",
    key: "2",
    icon: <ReadOutlined />,
    children: [
      {
        title: "Categorias",
        key: "/admin/categoria",
        icon: <ProfileOutlined />,
      },
      {
        title: "Productos",
        key: "/admin/producto",
        icon: <FileOutlined />,
      },
    ],
  },
  {
    title: "Gestión de Pedidos",
    key: "/admin/pedido",
    icon: <ShoppingCartOutlined />,
  },
  {
    title: "Reportes",
    key: "/admin/reporte",
    icon: <StockOutlined />,
  },
];

export default menuList;
