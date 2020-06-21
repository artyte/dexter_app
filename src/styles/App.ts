import styled from 'styled-components'

export const Application = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 15fr 85fr;
  grid-template-areas: 'sidebar dashboard';
`

export const SidebarArea = styled.div`
  grid-area: sidebar;
`

export const DashboardArea = styled.div`
  grid-area: dashboard;
`
