import React from "react";
import {
  Button,
  Card,
  CardBody,
  UncontrolledCollapse
} from "reactstrap";
import "./Services.css";



const faq = [
  {
    id: "toggle01",
    question: "How many days you will take to deliver?",
    answer:
      "Our experts will return your valuable clothes within 72 to 96 hours. But if your clothing needs special washing then it might take an extended time. Furthermore, delivery time will take longer for any road crisis (strike, blockage, traffic)."
  },
  {
    id: "toggle02",
    question: "Will you iron/pack my clothes after washing?",
    answer:
      "Yes! We will iron and pack your clothes after washing them if you mention it during order processing period."
  },
  {
    id: "toggle03",
    question: "Will you wash out every stains from my clothes?",
    answer:
      "Our service providers offer a safe cleaning guarantee. This does not mean we will remove every stain from your clothes. If our professionals state that stain removal will be unsafe, or will damage your clothes then the stain will remain."
  },
  {
    id: "toggle04",
    question: "What if I leave my personal items with clothes?",
    answer:
      "Our professional Service providers will check your clothes before preparing to wash. If they find anything they will collect and will return them to you with your washed clothes"
  },
  {
    id: "toggle05",
    question: "What if my clothes get missing?",
    answer:
      "Our Service Providers are experts in their services. However, accidents might occur for any reason. For this you need to contact the Service Provider you took service from. They will find out the solution. For any damage, loss, missing and defect during process of laundry, dry cleaning and pressing, compensation to the extent of 5% of charge will be provided after proper investigation of the claim."
  }
];

const FAQ = () => {
  return (
    <div>
      <div className="ml-5 my-5">
        <h2 className="service-text-color head-title mt-5">FAQ</h2>

        {faq.map(item => (
          <div className="terms" key={item.id}>
            <Button
              className="btn-round"
              outline
              id={item.id}
              style={{ marginBottom: "1rem", fontSize: "19px" }}
            >
              <span style={{ color: '#fff' }}>{item.question}</span>
            </Button>
            <UncontrolledCollapse toggler={`#${item.id}`}>
              <Card>
                <CardBody>{item.answer}</CardBody>
              </Card>
            </UncontrolledCollapse>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ;