/**
 * 博客列表项
 */

import React from 'react'
import { Link } from '../routes'
import styled from 'styled-components';

const Wrapper = styled.li`
  font-size: 14px;
  list-style: none;
  margin: 10px 0;
  a {
    text-decoration: none;
    display: block;
    &:hover {
      background: #F5F5F5;

      h3 { color: #387EF5 }
    }
  }
  h3 {
    color: #222;
    font-weight: bold;
    font-size: 16px;
    margin: 0;
  }
  p {
    font-size: 1.2rem;
    color: #444;
    font-family: "PT Serif", sans-serif;
    margin: 0;
  }
`;


/**
 *
 * 博客列表项组件,
 */


const PostItem = ({ post }) => (
  <Wrapper>
    <h3>{post.title}</h3>
    <Link route='post' params={{ id: post.id }}>
      <a href={post.permalink} target="_blank">
      {post.permalink}
      </a>
    </Link>
  </Wrapper>
)

export default PostItem
