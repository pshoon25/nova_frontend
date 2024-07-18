import React from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';

function Login() {

    const onChangeLoginId = () => {

    };

    const onChangeLoginPwd = () => {

    };

    const onClickLogin = () => {

    };


    return (
        <div>
            <Container className="container d-flex justify-content-center align-items-center" style={{height: "700px"}}>
				<Form style={{width: "400px"}}>
					<Form.Group className="mb-3" controlId="formPlaintextUserId">
						<Col sm>
                            <Form.Control
                                type="text" 
								placeholder="아이디"
                                onChange={onChangeLoginId}
                                className="mb-3"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPlaintextPassword">
                        <Col sm>
                            <Form.Control
                                type="password" 
								placeholder="비밀번호"
                                onChange={onChangeLoginPwd}
                            />
                        </Col>
                    </Form.Group>
                    <br/>

                    <div className="d-flex justify-content-between">
                    	<Button className="px-3" variant="outline-dark" onClick={onClickLogin}>로그인</Button>
                    	<Link to="/join">
                    		<Button className="px-3" variant="outline-dark">회원가입</Button>
                    	</Link>
                    	
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default Login;