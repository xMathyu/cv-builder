import React from "react";
import {
  // Programming Languages
  SiOpenjdk,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiKotlin,
  SiSharp,

  // Frontend
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTailwindcss,
  SiSass,
  SiHtml5,
  SiCss3,

  // Backend
  SiSpring,
  SiNodedotjs,
  SiNestjs,
  SiDotnet,
  SiFlask,
  SiDjango,

  // Databases
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiRabbitmq,
  SiSupabase,

  // Cloud & DevOps
  SiAmazon,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiGithub,
  SiGit,
  SiJenkins,
  SiTerraform,
  SiSonarqube,

  // Testing & Tools
  SiJunit5,
  SiJest,
  SiSelenium,
  SiPostman,
  SiFigma,
  SiJira,
  SiEclipseide,

  // Security & DevSecOps
  SiOwasp,
  SiBurpsuite,
  SiWireshark,
  SiKalilinux,
  SiMetasploit,
  SiSnyk,
  SiTrivy,
  SiHackerone,
  SiVault,
  SiOpenssl,
  SiKeycloak,
  SiCloudflare,
  SiAuth0,
  SiDependabot,
  SiGithubactions,

  // iOS / Apple
  SiSwift,
  SiApple,
  SiAppstore,
  SiIos,
  SiXcode,
  SiVercel,

  // AI & Machine Learning
  SiRoboflow,
  SiHuggingface,
  SiLangchain,
  SiOpencv,
  SiPytorch,
  SiTensorflow,

  // Other
  SiOpenai,
} from "react-icons/si";

import {
  // Generic icons from React Icons
  FaCode,
  FaCloud,
  FaTools,
  FaCog,
  FaRobot,
} from "react-icons/fa";

import {
  // Lucide icons for fallbacks
  Code2,
  TestTube,
  Brain,
  ShieldCheck,
  Bug,
  KeyRound,
  ScanSearch,
  Bot,
  Waypoints,
  ScanEye,
  Network,
  Languages,
  Search,
  CalendarClock,
} from "lucide-react";

interface TechIconProps {
  technology: string;
  size?: number;
  className?: string;
  /** false para heredar el color del contenedor en vez del color de marca. */
  colored?: boolean;
}

const techIconMap: Record<
  string,
  React.ComponentType<{
    size?: number;
    className?: string;
    title?: string;
    style?: React.CSSProperties;
  }>
> = {
  // Programming Languages
  Java: SiOpenjdk,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  Kotlin: SiKotlin,
  "C#": SiSharp,
  Csharp: SiSharp,

  // Frontend
  React: SiReact,
  "Next.js": SiNextdotjs,
  NextJs: SiNextdotjs,
  Angular: SiAngular,
  "Tailwind CSS": SiTailwindcss,
  Sass: SiSass,
  HTML: SiHtml5,
  CSS: SiCss3,
  HTML5: SiHtml5,
  CSS3: SiCss3,

  // Backend
  "Spring Boot": SiSpring,
  Spring: SiSpring,
  "Node.js": SiNodedotjs,
  NodeJS: SiNodedotjs,
  NestJS: SiNestjs,
  ".Net": SiDotnet,
  dotnet: SiDotnet,
  Flask: SiFlask,
  Django: SiDjango,

  // Databases
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  RabbitMQ: SiRabbitmq,
  Supabase: SiSupabase,

  // Cloud & DevOps
  AWS: SiAmazon,
  Azure: FaCloud,
  GCP: SiGooglecloud,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  GitHub: SiGithub,
  Git: SiGit,
  Jenkins: SiJenkins,
  Terraform: SiTerraform,
  SonarQube: SiSonarqube,

  // Testing & Tools
  JUnit: SiJunit5,
  Jest: SiJest,
  Selenium: SiSelenium,
  Postman: SiPostman,
  Figma: SiFigma,
  Jira: SiJira,
  Eclipse: SiEclipseide,

  // AI & ML
  AI: FaRobot,
  OpenAI: SiOpenai,
  "Machine Learning": Brain,
  "OpenAI API": SiOpenai,
  LLMs: Bot,
  LLM: Bot,
  RAG: Waypoints,
  RAGs: Waypoints,
  Roboflow: SiRoboflow,
  "Hugging Face": SiHuggingface,
  LangChain: SiLangchain,
  OpenCV: SiOpencv,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  "Computer Vision": ScanEye,
  // Nombres oficiales y las variantes cortas de uso corriente
  "AWS Bedrock": SiAmazon,
  Bedrock: SiAmazon,
  "Azure AI Foundry": FaCloud,
  "Azure Foundry": FaCloud,
  NLP: Network,
  "Speech-to-Text": Network,
  "Whisper X": Network,
  "Prompt Engineering": Bot,

  // iOS / Apple
  Swift: SiSwift,
  SwiftUI: SiSwift,
  iOS: SiIos,
  Apple: SiApple,
  "App Store": SiAppstore,
  Xcode: SiXcode,
  // Framework de Apple para leer el calendario del usuario
  EventKit: CalendarClock,

  // Web / hosting
  Vercel: SiVercel,
  i18n: Languages,
  SEO: Search,

  // Security & DevSecOps
  OWASP: SiOwasp,
  "OWASP Top 10": SiOwasp,
  "OWASP ZAP": ScanSearch,
  ZAP: ScanSearch,
  "Burp Suite": SiBurpsuite,
  Burp: SiBurpsuite,
  Wireshark: SiWireshark,
  "Kali Linux": SiKalilinux,
  Kali: SiKalilinux,
  Metasploit: SiMetasploit,
  Snyk: SiSnyk,
  Trivy: SiTrivy,
  HackerOne: SiHackerone,
  Vault: SiVault,
  "HashiCorp Vault": SiVault,
  OpenSSL: SiOpenssl,
  Cloudflare: SiCloudflare,
  Auth0: SiAuth0,
  Dependabot: SiDependabot,
  "GitHub Actions": SiGithubactions,
  Nmap: ScanSearch,
  sqlmap: ScanSearch,
  DAST: ScanSearch,
  SAST: ShieldCheck,
  SCA: ShieldCheck,
  Pentesting: Bug,
  "Penetration Testing": Bug,
  DevSecOps: ShieldCheck,
  "Threat Modeling": ShieldCheck,
  JWT: KeyRound,
  OAuth2: KeyRound,
  "OAuth 2.0": KeyRound,
  OIDC: KeyRound,
  "Playwright": TestTube,

  // Other Technologies
  WebFlux: SiSpring,
  RxJava: SiOpenjdk,
  DynamoDB: SiAmazon,
  // Las claves deben calzar exactamente con el nombre en los datos: antes
  // decían "KeyCloak" y "Kluwan" y ambas caían al icono genérico.
  Keycloak: SiKeycloak,
  "New Relic": FaCloud,
  Kiuwan: FaTools,
  CheckStyle: FaCode,
  Mockito: SiJunit5,
  Karate: TestTube,
  TDD: TestTube,
  BDD: TestTube,
  Microservices: FaCode,
  Scrumban: FaCog,
  WebSockets: FaCode,
  Ionic: SiAngular,
};

/**
 * Color oficial de cada marca. react-icons entrega los logos monocromos
 * (heredan currentColor), así que el color se aplica aquí en vez de cambiar
 * de librería: `@iconify/react` daría logos multitono pero descarga los
 * iconos de una API en runtime, y un icono que llega tarde sale vacío en el
 * PDF exportado.
 */
const techColorMap: Record<string, string> = {
  // Lenguajes
  Java: "#ED8B00",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Python: "#3776AB",
  Kotlin: "#7F52FF",
  "C#": "#239120",
  Csharp: "#239120",

  // Frontend
  React: "#61DAFB",
  "Next.js": "#000000",
  NextJs: "#000000",
  Angular: "#DD0031",
  Ionic: "#3880FF",
  "Tailwind CSS": "#06B6D4",
  Sass: "#CC6699",
  HTML: "#E34F26",
  HTML5: "#E34F26",
  CSS: "#1572B6",
  CSS3: "#1572B6",

  // Backend
  "Spring Boot": "#6DB33F",
  Spring: "#6DB33F",
  WebFlux: "#6DB33F",
  RxJava: "#ED8B00",
  "Node.js": "#5FA04E",
  NodeJS: "#5FA04E",
  NestJS: "#E0234E",
  ".Net": "#512BD4",
  dotnet: "#512BD4",
  Flask: "#000000",
  Django: "#092E20",

  // Datos
  MySQL: "#4479A1",
  PostgreSQL: "#4169E1",
  MongoDB: "#47A248",
  Redis: "#FF4438",
  RabbitMQ: "#FF6600",
  Supabase: "#3FCF8E",
  DynamoDB: "#FF9900",

  // Cloud y DevOps
  AWS: "#FF9900",
  Lambda: "#FF9900",
  SQS: "#FF4F8B",
  Azure: "#0078D4",
  GCP: "#4285F4",
  Docker: "#2496ED",
  Kubernetes: "#326CE5",
  GitHub: "#181717",
  Git: "#F05032",
  Jenkins: "#D24939",
  Terraform: "#844FBA",
  "New Relic": "#1CE783",
  "GitHub Actions": "#2088FF",

  // Seguridad y DevSecOps
  SonarQube: "#4E9BCD",
  Kiuwan: "#0B7285",
  OWASP: "#000000",
  "OWASP Top 10": "#000000",
  "Burp Suite": "#FF6633",
  Burp: "#FF6633",
  Wireshark: "#1679A7",
  "Kali Linux": "#557C94",
  Kali: "#557C94",
  Metasploit: "#2596CD",
  Snyk: "#4C4A73",
  Trivy: "#1904DA",
  HackerOne: "#494649",
  Vault: "#FFEC6E",
  "HashiCorp Vault": "#FFEC6E",
  OpenSSL: "#721412",
  Cloudflare: "#F38020",
  Auth0: "#EB5424",
  Dependabot: "#025E8C",
  Keycloak: "#4D4D4D",

  // Testing
  JUnit: "#25A162",
  Mockito: "#25A162",
  Jest: "#C21325",
  Selenium: "#43B02A",
  Postman: "#FF6C37",
  Playwright: "#2EAD33",

  // Herramientas
  Figma: "#F24E1E",
  Jira: "#0052CC",
  Eclipse: "#2C2255",

  // iOS y hosting
  Swift: "#F05138",
  SwiftUI: "#F05138",
  iOS: "#000000",
  Apple: "#000000",
  "App Store": "#0D96F6",
  Xcode: "#147EFB",
  Vercel: "#000000",

  // IA y Machine Learning
  OpenAI: "#412991",
  "OpenAI API": "#412991",
  Roboflow: "#6706CE",
  "AWS Bedrock": "#FF9900",
  Bedrock: "#FF9900",
  "Azure AI Foundry": "#0078D4",
  "Azure Foundry": "#0078D4",
  "Hugging Face": "#FFD21E",
  LangChain: "#1C3C3C",
  OpenCV: "#5C3EE8",
  PyTorch: "#EE4C2C",
  TensorFlow: "#FF6F00",
};

const TechIcon: React.FC<TechIconProps> = ({
  technology,
  size = 24,
  className = "",
  colored = true,
}) => {
  const IconComponent = techIconMap[technology] || Code2;
  const brand = colored ? techColorMap[technology] : undefined;

  return (
    <IconComponent
      size={size}
      className={`${className} transition-colors duration-200`}
      title={technology}
      // Inline gana a las clases de color de Tailwind del contenedor.
      style={brand ? { color: brand } : undefined}
    />
  );
};

export default TechIcon;
