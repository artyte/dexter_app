import styled, { css } from 'styled-components'

export const Popup = styled.div`
  display: grid;
  grid-template-areas:
    'link'
    'form';
  position: fixed;
  border-radius: 15px;
  background: #fcfcfc;
  box-shadow: 0px 15px 24px -1px rgba(122, 122, 122, 1);
  text-align: center;
  width: 1000px;
  height: 550px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`

export const LinkArea = styled.div`
  grid-area: link;
  display: grid;
  grid-template-areas: '. social close';
  grid-template-columns: 31fr 38fr 31fr;
  place-self: center;
  height: 300px;
  width: 100%;
`

export const SocialArea = styled.div`
  grid-area: social;
  place-self: center;
  width: max-content;
`

export const CloseArea = styled.div`
  grid-area: close;
`

export const FormArea = styled.div`
  grid-area: form;
`

export const CloseButton = styled.button`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 2%;
  padding-right: 1%;
`

export const CloseIcon = styled.img`
  width: 50%;
`

export const SocialHeader = styled.p`
  font-family: Microsoft New Tai Lue, Verdana, Arial, Tahoma, Serif;
  font-size: 3em;
  margin-bottom: 2px;
  margin-top: 15px;
`

export const FacebookButton = styled.button`
  background-color: Transparent;
  border: none;
  cursor: pointer;
  outline: none;
`

export const FacebookIcon = styled.img`
  display: inline-block;
  width: 180px;
  max-width: max-content;
`

export const FormHeader = styled.p`
  font-family: Microsoft New Tai Lue, Verdana, Arial, Tahoma, Serif;
  font-size: 2em;
  margin-bottom: 2px;
  margin-top: 2px;
`

export const Form = styled.form`
  display: grid;
  grid-template-columns: 20fr 25fr 10fr 25fr 20fr;
  place-items: center;
  width: 100%;
  height: 200px;
`

export const Field = styled.input`
  grid-column: 2/5;
  text-align: center;
  border-radius: 25px;
  background: #ffffff;
  box-shadow: 0px 3px 15px 1px rgba(0, 0, 0, 0.16);
  border: none;
  height: 45px;
  width: 100%;
  font-size: 1.5em;
  font-family: Microsoft New Tai Lue, Verdana, Arial, Tahoma, Serif;
`

export const FieldError = styled.span`
  color: red;
  font-size: 0.75em;
  grid-column: 2/5;
`

const Submit = css`
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  background: #ffffff;
  border-radius: 4px;
  font-family: Microsoft New Tai Lue, Verdana, Arial, Tahoma, Serif;
  font-size: 1.5em;
  height: 40px;
  width: 120%;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
  outline: none;
`

export const LoginButton = styled.button`
  ${Submit}
  grid-column: 2/3;
`

export const CreateButton = styled.button`
  ${Submit}
  grid-column: 4/5;
`
