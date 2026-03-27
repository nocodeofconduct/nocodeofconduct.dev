import {
  CheckCircleOutlined,
  MessageOutlined,
  SafetyCertificateOutlined,
  StopOutlined,
  SyncOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Layout,
  Row,
  Space,
  Tag,
  Timeline,
  Typography,
} from "antd";

import { siteConfig } from "../config/site";

const { Content, Footer, Header } = Layout;

const articles = [
  {
    description:
      "Start from peerhood, not suspicion. Adults deserve context, candor, and room to correct course.",
    icon: <SafetyCertificateOutlined aria-hidden="true" />,
    title: "Assume competence",
  },
  {
    description:
      "Name technical and interpersonal problems directly. Vague politeness is often just deferred conflict.",
    icon: <MessageOutlined aria-hidden="true" />,
    title: "Speak plainly",
  },
  {
    description:
      "When someone crosses a line, respond proportionally, make repair visible, and turn folklore into agreement.",
    icon: <SyncOutlined aria-hidden="true" />,
    title: "Repair quickly",
  },
  {
    description:
      "Everyone protects the codebase, the working relationship, and the conditions that let serious work continue.",
    icon: <TeamOutlined aria-hidden="true" />,
    title: "Share stewardship",
  },
] as const;

const refusals = [
  "symbolic compliance in place of judgment",
  "ideological slogans during technical disagreement",
  "managerial theater pretending to be care",
  "rules nobody can interpret without an authority figure",
] as const;

const protections = [
  "direct feedback without humiliation",
  "proportionate consequences when trust is broken",
  "visible repair instead of silent resentment",
  "a culture contributors can genuinely co-own",
] as const;

const workingAgreement = [
  "Say what the problem is.",
  "Assume the other person can hear it.",
  "Repair damage when it happens.",
  "Protect the work and the relationship together.",
] as const;

export default function NoCodeOfConductLanding() {
  return (
    <ConfigProvider theme={{ zeroRuntime: true }}>
      <Layout className="nococ-layout">
        <Header className="nococ-header">
          <div className="nococ-shell nococ-header__inner">
            <Space size="middle" wrap>
              <Typography.Text strong className="nococ-brand">
                No Code of Conduct
              </Typography.Text>
              <Tag color="blue">adult self-governance</Tag>
            </Space>

            <Space size="small" wrap>
              <Button type="text" href="#articles">
                Articles
              </Button>
              <Button type="text" href="#protections">
                Protections
              </Button>
            </Space>
          </div>
        </Header>

        <Content className="nococ-shell nococ-content">
          <Card variant="borderless" className="nococ-hero-card">
            <Row gutter={[32, 32]} align="middle">
              <Col xs={24} lg={14}>
                <Space vertical size="middle" className="nococ-hero-copy">
                  <div className="nococ-tag-row">
                    <Tag color="processing">direct speech</Tag>
                    <Tag color="success">repair over ritual</Tag>
                    <Tag>reciprocal respect</Tag>
                  </div>

                  <Typography.Title level={1}>
                    A code of conduct adults can own.
                  </Typography.Title>

                  <Typography.Paragraph className="nococ-lede">
                    No slogans, no loyalty theater, no paternalistic scripts.
                    Healthy technical communities can state expectations
                    plainly, enforce them proportionally, and repair harm in the
                    open.
                  </Typography.Paragraph>

                  <Typography.Paragraph className="nococ-lede nococ-lede--muted">
                    The point is not the absence of norms. It is the presence of
                    norms serious enough to be interpreted, upheld, and revised
                    by the people doing the work.
                  </Typography.Paragraph>

                  <Space wrap className="nococ-hero-actions">
                    <Button type="primary" href="#articles">
                      Read the articles
                    </Button>
                    <Button href="#agreement">Working agreement</Button>
                  </Space>
                </Space>
              </Col>

              <Col xs={24} lg={10}>
                <section
                  id="agreement"
                  aria-label="Working agreement for adult self-governance"
                >
                  <Card className="nococ-agreement-card">
                    <Space vertical size="small">
                      <Tag color="cyan">Working agreement</Tag>
                      <Typography.Title level={4}>
                        Short enough to use in real life.
                      </Typography.Title>
                      <Typography.Paragraph className="nococ-paragraph-muted">
                        A real code of conduct assumes judgment. It names
                        obligations without outsourcing adulthood.
                      </Typography.Paragraph>
                    </Space>

                    <Timeline
                      className="nococ-agreement-timeline"
                      items={workingAgreement.map((item) => ({
                        content: item,
                      }))}
                    />
                  </Card>
                </section>
              </Col>
            </Row>
          </Card>

          <section id="articles" className="nococ-section">
            <Space vertical size="small" className="nococ-section-heading">
              <Tag color="blue">Four articles</Tag>
              <Typography.Title level={2}>
                Strong enough to guide a serious team.
              </Typography.Title>
              <Typography.Paragraph className="nococ-paragraph-muted">
                A serious code can fit on one page because it assumes judgment,
                context, and reciprocal obligation instead of ritual
                performance.
              </Typography.Paragraph>
            </Space>

            <Row gutter={[16, 16]}>
              {articles.map((article, index) => (
                <Col key={article.title} xs={24} md={12}>
                  <Card className="nococ-article-card">
                    <div className="nococ-article-header">
                      <Space align="start" size="middle">
                        <span className="nococ-article-icon">
                          {article.icon}
                        </span>
                        <div>
                          <Tag>{`Article ${index + 1}`}</Tag>
                          <Typography.Title level={3}>
                            {article.title}
                          </Typography.Title>
                        </div>
                      </Space>
                    </div>

                    <Typography.Paragraph className="nococ-paragraph-muted">
                      {article.description}
                    </Typography.Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          <section id="protections" className="nococ-section">
            <Space vertical size="small" className="nococ-section-heading">
              <Tag color="geekblue">No ritual</Tag>
              <Typography.Title level={2}>
                What this refuses and what it protects.
              </Typography.Title>
              <Typography.Paragraph className="nococ-paragraph-muted">
                “No Code of Conduct” is not a shrug. It is a refusal to replace
                adult responsibility with ceremony, while keeping the
                obligations that make collaboration livable.
              </Typography.Paragraph>
            </Space>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card className="nococ-list-card">
                  <Space vertical size="small">
                    <Tag color="volcano">Refuses</Tag>
                    <Typography.Title level={4}>
                      No symbolic adulthood.
                    </Typography.Title>
                  </Space>

                  <ul className="nococ-bullet-list">
                    {refusals.map((item) => (
                      <li key={item} className="nococ-bullet-list__item">
                        <Space align="start">
                          <StopOutlined className="nococ-list-icon nococ-list-icon--stop" />
                          <Typography.Text>{item}</Typography.Text>
                        </Space>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card className="nococ-list-card">
                  <Space vertical size="small">
                    <Tag color="green">Protects</Tag>
                    <Typography.Title level={4}>
                      A culture people can co-own.
                    </Typography.Title>
                  </Space>

                  <ul className="nococ-bullet-list">
                    {protections.map((item) => (
                      <li key={item} className="nococ-bullet-list__item">
                        <Space align="start">
                          <CheckCircleOutlined className="nococ-list-icon nococ-list-icon--check" />
                          <Typography.Text>{item}</Typography.Text>
                        </Space>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Col>
            </Row>
          </section>

          <section className="nococ-note">
            <Alert
              showIcon
              type="info"
              title="No ritual, no shrug."
              description="The case being made here is simpler: use a code of conduct written for adults, keep it legible, and let the people doing the work share responsibility for upholding it."
            />
          </section>
        </Content>

        <Footer className="nococ-shell nococ-footer">
          <Divider />
          <Space vertical size={0}>
            <Typography.Text type="secondary">
              No Code of Conduct
            </Typography.Text>
            <Typography.Text type="secondary">
              {siteConfig.footerNote}
            </Typography.Text>
          </Space>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}
