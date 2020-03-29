import React, { Fragment } from 'react'
import { Segment, Header, Comment, Form, Button } from 'semantic-ui-react'

const ActivityDetailedChat = () => {

    return (
        <Fragment>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header> CHAT ABOUT THİS EVENT </Header>
            </Segment>
            <Segment attached>
                <Comment.Group>

                    <Comment>
                        <Comment.Avatar src='/assets/user.png' />
                        <Comment.Content>
                            <Comment.Author as='as'>Ati</Comment.Author>
                            <Comment.Metadata>
                                <div>Today at 5:42</div>
                            </Comment.Metadata>
                            <Comment.Text> Vay canına </Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                    <Comment>
                        <Comment.Avatar src='/assets/user.png' />
                        <Comment.Content>
                            <Comment.Author as='as'>Cico</Comment.Author>
                            <Comment.Metadata>
                                <div>Today at 5:42</div>
                            </Comment.Metadata>
                            <Comment.Text> Ne sandın Yarram </Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>

                    <Form reply>
                        <Form.TextArea />
                        <Button
                            position='right'
                            content='Add reply'
                            labelPosition='right'
                            icon='edit'
                            primary
                        />
                    </Form>

                </Comment.Group>
            </Segment>
        </Fragment>

    )
}


export default ActivityDetailedChat
