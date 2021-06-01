import {Container,Row,Col} from 'react-bootstrap';


import MainContainer from "./MainContainer";
import Sidebar from "./Sidebar";

export default function Home(){
    return <>
    <Container fluid>
     <Row className="flex-items">
         <Col md={4}><Sidebar/></Col>
         <Col md={8}><MainContainer/></Col>
     </Row>   
    </Container>
    </>
}