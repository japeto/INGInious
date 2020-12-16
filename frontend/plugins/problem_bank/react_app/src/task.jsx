import React from "react";
import {Modal, Button, Row, Col, Well} from 'react-bootstrap';
import CourseAutosuggest from './course_autosuggest';

class Task extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            showModal: false
        };

        this.onClick = this.onClick.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    open() {
        this.setState({showModal: true});
    };

    close() {
        this.setState({showModal: false});
    };

    onClick(courseId) {
        const taskId = this.props.task_info.task_id;
        const bankId = this.props.task_info.course_id;
        const addTaskToCourse = this.props.callBackAddTaskToCourse;

        addTaskToCourse(courseId, taskId, bankId);
        this.close();
    }

    render() {
        return (
            <div>
                <button className="list-group-item" onClick={this.open}>
                    <b>{this.props.task_info.course_name + " - " + this.props.task_info.task_name}</b>
                    <br/>

                    {this.props.task_info.tags.join(', ')}
                </button>
                <Modal className="modal-container"
                       show={this.state.showModal}
                       onHide={this.close}
                       animation={true}
                       bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title componentClass="h3"
                                     bsClass="new-modal-title"> {this.props.task_info.task_name} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={1}>
                                <h5>Course:</h5>
                            </Col>
                            <Col md={11}>
                                <Well bsSize="small">{this.props.task_info.course_name}</Well>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={1}>
                                <h5>Author:</h5>
                            </Col>
                            <Col md={11}>
                                <Well bsSize="small">{this.props.task_info.task_author}</Well>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={1}>
                                <h5>Context:</h5>
                            </Col>
                            <Col md={11}>
                                <Well bsSize="small"
                                      dangerouslySetInnerHTML={{__html: this.props.task_info.task_context}}></Well>
                            </Col>
                        </Row>

                        <Well bsSize="small">
                            <h5>Select destination course</h5>
                            <CourseAutosuggest
                                task_info={this.props.task_info}
                                courses={this.props.courses}
                                alertTitle={
                                    "Do you want to add the task '" + this.props.task_info.task_name +
                                    "' to the selected course?"
                                }
                                alertText={""}
                                messageButton={"Copy task"}
                                callbackOnClick={this.onClick}
                                mdInput={4}
                                mdButton={4}
                            />
                        </Well>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Task;