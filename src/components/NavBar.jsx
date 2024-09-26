import React from 'react';
import { Menu } from 'antd';
import {
  FireOutlined,
  UserOutlined,
  MessageOutlined,
  RocketOutlined,
  BlockOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import '../style/NavBarStyle.css'; // Create and import your CSS file for styling

function NavBar() {
  return (
    <Menu mode="horizontal" className="bottom-menu" selectedKeys={[]}>
      <Menu.Item key="connections" icon={<MessageOutlined />}>
        <NavLink to="/connections">Connections</NavLink>
      </Menu.Item>
      <Menu.Item key="leaderboard" icon={<RocketOutlined />}>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </Menu.Item>
      <Menu.Item key="recruiting" icon={<FireOutlined />}>
        <NavLink to="/recruiting">Recruting</NavLink>
      </Menu.Item>
      <Menu.Item key="resume" icon={<UserOutlined />}>
        <NavLink to="/profile">Resume</NavLink>
      </Menu.Item>
      <Menu.Item key="actions" icon={<BlockOutlined />}>
        <NavLink to="/actions">Actions</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;
