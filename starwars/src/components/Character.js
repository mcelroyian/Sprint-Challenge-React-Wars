import React from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, ListGroup, ListGroupItem } from 'reactstrap';
import CardContainer from './CardContainer'
// Write your Character component here

const Character = props => {
    const { name, gender, height, mass, hair_color, skin_color, eye_color } = props.char
    return (
        <CardContainer>
            <Card>
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardSubtitle>{gender}</CardSubtitle>
                        <ListGroup>
                            <ListGroupItem>Height: {height}cm</ListGroupItem>
                            <ListGroupItem>Mass: {mass}kg</ListGroupItem>
                            <ListGroupItem>Hair Color: {hair_color}</ListGroupItem>
                            <ListGroupItem>Skin Color: {skin_color}</ListGroupItem>
                            <ListGroupItem>Eye Color: {eye_color}</ListGroupItem>
                            <ListGroupItem>Species: {props.species}</ListGroupItem>
                            <ListGroupItem>HomeWorld: {props.homeworld}</ListGroupItem>
                        </ListGroup>
                </CardBody>
            </Card>
        </CardContainer>

    )

}

export default Character