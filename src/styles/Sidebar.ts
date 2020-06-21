import styled from 'styled-components'

export const Button = styled.button`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`

export const TopIcons = styled.li`
  list-style-type: none;
  margin-top: 15px;
`

export const BottomIcons = styled.li`
  list-style-type: none;
  text-align: center;
  margin-bottom: 15px;
  position: absolute;
  bottom: 0;
`

export const Nav = styled.nav`
  background-color: #e74c3c;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  filter: ${(props: any) => (props.blur ? 'blur(5px)' : 'blur(0px)')};
`
