import {
  ArrowRightOutlined,
  CheckCircleFilled,
  CompassOutlined,
  MessageOutlined,
  SafetyCertificateOutlined,
  StopFilled,
  SyncOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Row,
  Space,
  Tag,
  Timeline,
  Typography,
} from "antd";

import { siteConfig } from "../config/site";

const { Content, Footer, Header } = Layout;

const navLinks = [
  {
    href: "#articles",
    label: "Articles",
  },
  {
    href: "#compact-code",
    label: "Compact code",
  },
  {
    href: "#boundaries",
    label: "Boundaries",
  },
] as const;

const heroSignals = [
  {
    detail:
      "Name the problem directly and leave room for the other person to answer it.",
    title: "Speak in full sentences",
  },
  {
    detail:
      "Consequences should match the breach instead of escalating into theater.",
    title: "Respond proportionally",
  },
  {
    detail:
      "Repair should be visible, legible, and owned by the people affected.",
    title: "Make repair explicit",
  },
] as const;

const articles = [
  {
    description:
      "Start from peerhood, not suspicion. Adults deserve context, candor, and room to correct course.",
    detail:
      "If a community cannot tell the difference between malice, friction, and honest error, it will eventually hand every disagreement to process instead of judgment.",
    icon: <SafetyCertificateOutlined aria-hidden="true" />,
    label: "Article 1",
    title: "Assume competence",
  },
  {
    description:
      "Name technical and interpersonal problems directly. Vague politeness is usually deferred conflict wearing makeup.",
    detail:
      "Plain speech is not cruelty. It is how teams keep resentment from congealing into folklore, cliques, and whispered authority.",
    icon: <MessageOutlined aria-hidden="true" />,
    label: "Article 2",
    title: "Speak plainly",
  },
  {
    description:
      "When someone crosses a line, respond quickly, proportionally, and in a way that keeps repair available.",
    detail:
      "The goal is not ceremonial purity. The goal is to stop damage, clarify expectations, and make the path back to trust legible.",
    icon: <SyncOutlined aria-hidden="true" />,
    label: "Article 3",
    title: "Repair quickly",
  },
  {
    description:
      "Everyone helps protect the codebase, the working relationship, and the conditions that keep serious work possible.",
    detail:
      "A culture worth joining is not managed from above like a daycare. It is co-owned by contributors who are willing to intervene when the work or the relationship starts to rot.",
    icon: <TeamOutlined aria-hidden="true" />,
    label: "Article 4",
    title: "Share stewardship",
  },
] as const;

const workingAgreement = [
  {
    description:
      "Do not hide the issue behind vibes, euphemism, or delayed escalation.",
    title: "Say what the problem is.",
  },
  {
    description:
      "Start from the assumption that serious people can hear serious feedback.",
    title: "Assume the other person can hear it.",
  },
  {
    description:
      "Repair the damage in a way other contributors can see and rely on.",
    title: "Repair damage when it happens.",
  },
  {
    description:
      "Keep the work and the relationship inside the same moral frame.",
    title: "Protect the work and the relationship together.",
  },
] as const;

const refusals = [
  {
    description:
      "Slogans that stand in for actual judgment during technical conflict.",
    title: "Ideological scripts",
  },
  {
    description:
      "Rules that only make sense once an authority figure explains what they really mean.",
    title: "Opaque procedure",
  },
  {
    description:
      "Managerial care-language used to avoid naming the actual breach or disagreement.",
    title: "Therapeutic theater",
  },
] as const;

const protections = [
  {
    description:
      "Direct feedback without humiliation, baiting, or status games.",
    title: "Candor with dignity",
  },
  {
    description:
      "Consequences that scale to the harm instead of turning every problem into a purge.",
    title: "Proportionate response",
  },
  {
    description:
      "Visible repair so people are not forced to trust private assurances and whispered settlements.",
    title: "Legible repair",
  },
] as const;

const theme = {
  components: {
    Button: {
      defaultShadow: "none",
      primaryShadow: "none",
    },
    Card: {
      borderRadiusLG: 28,
    },
    Layout: {
      bodyBg: "transparent",
      footerBg: "transparent",
      headerBg: "transparent",
    },
  },
  token: {
    borderRadius: 18,
    borderRadiusLG: 28,
    colorBorder: "rgba(17, 24, 39, 0.14)",
    colorPrimary: "#1d4ed8",
    colorText: "#121826",
    colorTextSecondary: "rgba(18, 24, 38, 0.7)",
    fontFamily: '"Avenir Next", "Segoe UI", "Helvetica Neue", sans-serif',
  },
  zeroRuntime: true,
};

export default function NoCodeOfConductLanding() {
  return (
    <ConfigProvider theme={theme}>
      <Layout className="nococ-layout">
        <Header className="nococ-header">
          <div className="nococ-frame nococ-header__inner">
            <Space
              orientation="vertical"
              size={0}
              className="nococ-brand-block"
            >
              <Typography.Text strong className="nococ-brand">
                No Code of Conduct
              </Typography.Text>
              <Typography.Text className="nococ-brand-note">
                for adults building things together
              </Typography.Text>
            </Space>

            <Flex gap="small" wrap className="nococ-header__nav">
              {navLinks.map((link) => (
                <Button key={link.href} type="text" href={link.href}>
                  {link.label}
                </Button>
              ))}
            </Flex>
          </div>
        </Header>

        <Content>
          <section className="nococ-hero" id="top">
            <div className="nococ-frame nococ-hero__inner">
              <Row gutter={[48, 36]} align="middle">
                <Col xs={24} xl={14}>
                  <Space
                    orientation="vertical"
                    size="large"
                    className="nococ-hero__content"
                  >
                    <Flex gap="small" wrap className="nococ-tag-row">
                      <Tag variant="filled" color="blue">
                        adult self-governance
                      </Tag>
                      <Tag variant="filled">technical merit first</Tag>
                      <Tag variant="filled">repair over ritual</Tag>
                    </Flex>

                    <div className="nococ-hero__copy">
                      <Typography.Text className="nococ-kicker">
                        A manifesto for technical communities that refuse
                        paternalism.
                      </Typography.Text>
                      <Typography.Title level={1} className="nococ-hero__title">
                        Keep the code of conduct. Lose the infantilizing
                        theater.
                      </Typography.Title>
                      <Typography.Paragraph className="nococ-hero__lede">
                        The point is not the absence of norms. The point is a
                        culture strong enough to state expectations plainly,
                        enforce them proportionally, and revise them in the open
                        without pretending contributors are children.
                      </Typography.Paragraph>
                    </div>

                    <Flex gap="middle" wrap className="nococ-hero__actions">
                      <Button
                        type="primary"
                        size="large"
                        href="#articles"
                        icon={<ArrowRightOutlined />}
                      >
                        Read the four articles
                      </Button>
                      <Button size="large" href="#compact-code">
                        Read the compact code
                      </Button>
                    </Flex>
                  </Space>
                </Col>

                <Col xs={24} xl={10}>
                  <div className="nococ-hero__aside">
                    <Typography.Text className="nococ-panel-label">
                      Operating premise
                    </Typography.Text>
                    <Typography.Title level={3}>
                      A serious team can name a problem without summoning an
                      authority ritual.
                    </Typography.Title>
                    <Typography.Paragraph className="nococ-panel-copy">
                      Healthy communities are allowed to be specific. They can
                      say what happened, who it affected, and what repair now
                      looks like.
                    </Typography.Paragraph>

                    <Divider className="nococ-divider" />

                    <Row gutter={[16, 16]}>
                      {heroSignals.map((signal) => (
                        <Col key={signal.title} xs={24} sm={8} xl={24}>
                          <div className="nococ-signal">
                            <Typography.Text
                              strong
                              className="nococ-signal__title"
                            >
                              {signal.title}
                            </Typography.Text>
                            <Typography.Paragraph className="nococ-signal__copy">
                              {signal.detail}
                            </Typography.Paragraph>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </section>

          <section
            id="articles"
            className="nococ-section nococ-section--articles"
          >
            <div className="nococ-frame">
              <Row gutter={[40, 24]} className="nococ-section__intro">
                <Col xs={24} lg={8}>
                  <Space orientation="vertical" size="small">
                    <Tag variant="filled" color="geekblue">
                      Four articles
                    </Tag>
                    <Typography.Title level={2}>
                      Strong enough to guide a serious team.
                    </Typography.Title>
                  </Space>
                </Col>
                <Col xs={24} lg={16}>
                  <Typography.Paragraph className="nococ-section__lede">
                    A community does not become safer by becoming more vague. It
                    becomes safer when its standards are legible enough to use
                    during conflict, disagreement, and repair.
                  </Typography.Paragraph>
                </Col>
              </Row>

              <div className="nococ-articles">
                {articles.map((article, index) => (
                  <article key={article.title} className="nococ-article">
                    <Row gutter={[24, 20]}>
                      <Col xs={24} md={5}>
                        <Space
                          orientation="vertical"
                          size={0}
                          className="nococ-article__meta"
                        >
                          <Typography.Text className="nococ-article__index">
                            {`0${index + 1}`}
                          </Typography.Text>
                          <Typography.Text className="nococ-article__label">
                            {article.label}
                          </Typography.Text>
                        </Space>
                      </Col>

                      <Col xs={24} md={19}>
                        <Space
                          orientation="vertical"
                          size="middle"
                          className="nococ-article__body"
                        >
                          <Space size="middle" align="start">
                            <span className="nococ-article__icon">
                              {article.icon}
                            </span>
                            <div>
                              <Typography.Title level={3}>
                                {article.title}
                              </Typography.Title>
                              <Typography.Paragraph className="nococ-article__summary">
                                {article.description}
                              </Typography.Paragraph>
                            </div>
                          </Space>

                          <Typography.Paragraph className="nococ-article__detail">
                            {article.detail}
                          </Typography.Paragraph>
                        </Space>
                      </Col>
                    </Row>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="compact-code"
            className="nococ-section nococ-section--compact"
            aria-label="Working agreement for adult self-governance"
          >
            <div className="nococ-frame">
              <div className="nococ-compact">
                <Row gutter={[32, 32]} align="middle">
                  <Col xs={24} lg={9}>
                    <Space orientation="vertical" size="small">
                      <Tag variant="filled" color="cyan">
                        Compact code
                      </Tag>
                      <Typography.Title level={2}>
                        Short enough to use in real life.
                      </Typography.Title>
                      <Typography.Paragraph className="nococ-section__lede nococ-section__lede--light">
                        A real code of conduct fits in a minute because it
                        trusts adults to interpret context instead of hiding
                        every judgment call inside procedure.
                      </Typography.Paragraph>
                    </Space>
                  </Col>

                  <Col xs={24} lg={15}>
                    <Timeline
                      className="nococ-timeline"
                      items={workingAgreement.map((item, index) => ({
                        content: (
                          <div className="nococ-timeline__content">
                            <Typography.Text className="nococ-timeline__index">
                              {`0${index + 1}`}
                            </Typography.Text>
                            <Typography.Title level={4}>
                              {item.title}
                            </Typography.Title>
                            <Typography.Paragraph className="nococ-section__lede nococ-section__lede--light">
                              {item.description}
                            </Typography.Paragraph>
                          </div>
                        ),
                      }))}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </section>

          <section id="boundaries" className="nococ-section">
            <div className="nococ-frame">
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                  <Card
                    variant="borderless"
                    className="nococ-panel nococ-panel--refusal"
                  >
                    <Space orientation="vertical" size="small">
                      <Tag variant="filled" color="volcano">
                        Refuses
                      </Tag>
                      <Typography.Title level={3}>
                        No symbolic adulthood.
                      </Typography.Title>
                      <Typography.Paragraph className="nococ-panel-copy">
                        If a standard cannot survive plain language, it is
                        probably trying to hide power rather than guide
                        behavior.
                      </Typography.Paragraph>
                    </Space>

                    <ul className="nococ-list">
                      {refusals.map((item) => (
                        <li key={item.title} className="nococ-list__item">
                          <Space size="middle" align="start">
                            <StopFilled className="nococ-list__icon nococ-list__icon--stop" />
                            <div>
                              <Typography.Text strong>
                                {item.title}
                              </Typography.Text>
                              <Typography.Paragraph className="nococ-list__copy">
                                {item.description}
                              </Typography.Paragraph>
                            </div>
                          </Space>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Col>

                <Col xs={24} lg={12}>
                  <Card
                    variant="borderless"
                    className="nococ-panel nococ-panel--protection"
                  >
                    <Space orientation="vertical" size="small">
                      <Tag variant="filled" color="green">
                        Protects
                      </Tag>
                      <Typography.Title level={3}>
                        What a grown-up standard preserves.
                      </Typography.Title>
                      <Typography.Paragraph className="nococ-panel-copy">
                        The absence of ritual is not a shrug. It is a demand for
                        norms that contributors can actually share, interpret,
                        and uphold together.
                      </Typography.Paragraph>
                    </Space>

                    <ul className="nococ-list">
                      {protections.map((item) => (
                        <li key={item.title} className="nococ-list__item">
                          <Space size="middle" align="start">
                            <CheckCircleFilled className="nococ-list__icon nococ-list__icon--check" />
                            <div>
                              <Typography.Text strong>
                                {item.title}
                              </Typography.Text>
                              <Typography.Paragraph className="nococ-list__copy">
                                {item.description}
                              </Typography.Paragraph>
                            </div>
                          </Space>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Col>
              </Row>
            </div>
          </section>

          <section className="nococ-section nococ-section--closing">
            <div className="nococ-frame">
              <div className="nococ-closing">
                <Row gutter={[32, 24]} align="middle">
                  <Col xs={24} lg={15}>
                    <Space orientation="vertical" size="small">
                      <Tag variant="filled">No ritual, no shrug</Tag>
                      <Typography.Title level={2}>
                        Write the norms like you expect adults to enforce them.
                      </Typography.Title>
                      <Typography.Paragraph className="nococ-section__lede">
                        Serious communities do not need less responsibility.
                        They need fewer euphemisms, fewer authority games, and
                        standards that still make sense once the meeting is
                        over.
                      </Typography.Paragraph>
                    </Space>
                  </Col>

                  <Col xs={24} lg={9}>
                    <div className="nococ-closing__actions">
                      <Space orientation="vertical" size="middle">
                        <Flex gap="small" wrap>
                          <Tag variant="filled" icon={<CompassOutlined />}>
                            orient the team
                          </Tag>
                          <Tag variant="filled" icon={<SyncOutlined />}>
                            repair in the open
                          </Tag>
                          <Tag variant="filled" icon={<ArrowRightOutlined />}>
                            keep moving
                          </Tag>
                        </Flex>
                        <Button type="primary" size="large" href="#top">
                          Back to the manifesto
                        </Button>
                      </Space>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </section>
        </Content>

        <Footer className="nococ-footer">
          <div className="nococ-frame nococ-footer__inner">
            <Divider className="nococ-divider" />
            <Row gutter={[16, 12]}>
              <Col xs={24} md={12}>
                <Space orientation="vertical" size={0}>
                  <Typography.Text strong>No Code of Conduct</Typography.Text>
                  <Typography.Text type="secondary">
                    Contributions will be judged by their technical merit.
                  </Typography.Text>
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space
                  orientation="vertical"
                  size={0}
                  className="nococ-footer__meta"
                >
                  <Typography.Text type="secondary">
                    {siteConfig.footerNote}
                  </Typography.Text>
                </Space>
              </Col>
            </Row>
          </div>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}
