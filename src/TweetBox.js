import * as React from "react";
import PropTypes from "prop-types";
import { Col, Card, Row, Stack, Figure } from "react-bootstrap";
// import { AiOutlineRetweet } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

TweetBox.propTypes = {
    result: PropTypes.object.isRequired,
    clickedPieChartName: PropTypes.object.isRequired,
};

export default function TweetBox(props) {
    const result = props.result;
    if (Object.keys(result).length == 0) {
        return <div></div>;
    } else {
        const pieChartTyped = props.clickedPieChartName;
        let selectedType = "";
        let selectedVal = 0;
        if (Object.keys(pieChartTyped).length > 0) {
            for (const [key, value] of Object.entries(pieChartTyped)) {
                if (key == "sentiment") {
                    selectedType = "sentiment";
                } else if (key == "subjectivity") {
                    selectedType = "subjectivity";
                }
                selectedVal = value;
            }
            console.log(selectedType);
            console.log(selectedVal);
            console.log(pieChartTyped);
        }
        return (
            <Stack gap={3}>
                <h2>List of Tweets from the selected ticker</h2>
                {
                    // start extracting the result and get the actual values!
                    // result["docs"].map((item, index) => {
                    result.result.map((item, index) => {
                        if (selectedType != "") {
                            if (item[selectedType][0] != selectedVal) {
                                return;
                            }
                        }
                        const date = new Date(item.post_date[0]);
                        const formattedDate = date.toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                            hour12: true,
                            timeZone: "UTC",
                        });
                        return (
                            <Card key={index}>
                                <Row>
                                    <Col md="auto">
                                        <h4>{item.author[0]}</h4>
                                    </Col>
                                    <Col md="auto">
                                        <p>{formattedDate}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>{item.raw_text[0]}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="auto">
                                        <FcLike />
                                        <p>{item.like_num[0]}</p>
                                    </Col>
                                    {/* <Col md="auto">
                                        <AiOutlineRetweet />
                                        <p>{item.retweet_num}</p>
                                    </Col> */}
                                    <Col md="auto">
                                        <Figure>
                                            <Figure.Image
                                                width={30}
                                                alt="sentiment"
                                                src={
                                                    item.sentiment[0] == -1
                                                        ? "pictures/decrease.png"
                                                        : item.sentiment[0] == 0
                                                        ? "pictures/neutral.png"
                                                        : "pictures/increase.png"
                                                }
                                            />
                                            <Figure.Caption>
                                                {item.sentiment[0] == -1
                                                    ? "Bearish"
                                                    : item.sentiment[0] == 0
                                                    ? "Neutral"
                                                    : "Bullish"}
                                            </Figure.Caption>
                                        </Figure>
                                    </Col>
                                    <Col md="auto">
                                        <Figure>
                                            <Figure.Image
                                                width={20}
                                                alt="Subjectivity"
                                                src={
                                                    item.subjectivity[0] == 0
                                                        ? "pictures/brainstorm.png"
                                                        : "pictures/heart.png"
                                                }
                                            />
                                            <Figure.Caption>
                                                {item.subjectivity[0] == 0
                                                    ? "Objective"
                                                    : "Subjective"}
                                            </Figure.Caption>
                                        </Figure>
                                    </Col>
                                </Row>
                            </Card>
                        );
                    })
                }
            </Stack>
        );
    }
}
