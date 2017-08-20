// 导航菜单组件

import Link from 'next/link'
import styled from 'styled-components';

const Container = styled.nav`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  background: #387EF5;

  a {
    padding: 0 15px;
    color: #FFF;
  }
`;

const Navigation = () => (
  <Container>
    <Link href='/'><a>主页</a></Link> |
    <Link href='/about' prefetch><a>关于</a></Link> |
    <Link href='/contact' prefetch><a>联系信息</a></Link>
  </Container>
)

export default Navigation;
