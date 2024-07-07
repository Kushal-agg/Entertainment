import styled from 'styled-components';

export const Box = styled.div`
padding: 30px 30px;
background: black;
position: relative;
bottom: 0;
width: 95.3%;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-item:center;
	max-width: 1000px;
	padding: auto;
`

export const Column = styled.div`
display: flex;
flex-direction: row;
justify-content:center;
align-item:center;
// text-align: center;

`;

export const Row = styled.div`
display: inline-block;
margin-top:10px;
margin-bottom:0;
`;

export const FooterLink = styled.a`
color: #fff;
margin: 6px 50px ;
display: inline-block;
font-size: 18px;
text-decoration: none;

&:hover {
	color: green;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 24px;
color: #fff;
margin-bottom: 20px;
margin-right:20px;
margin-left:20px;
font-weight: bold;
`;
