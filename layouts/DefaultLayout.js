import Head from 'next/head'
import styled from 'styled-components';
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
// 定义一个DIV容器组件, 用于包裹整个页面.
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  main {
    flex: 1;
  }
`;
export default ({ children, title = '默认标题' }) => (
  <Container>
    <Head>
      <title>{ title }</title>
    </Head>
    <header>
      <Navigation />
    </header>
    <main>
      { children }
    </main>
    <Footer>
      这是页脚
    </Footer>
  </Container>
)
