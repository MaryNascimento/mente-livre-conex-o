export type Modalidade = "Online" | "Presencial";

export type Psicologo = {
  id: string;
  nome: string;
  crp: string;
  cidade: string;
  estado: string;
  preco: number;
  nota: number;
  pacientes: number;
  anos: number;
  formacao: string;
  abordagem: string;
  especialidades: string[];
  especializacoes: string[];
  modalidades: Modalidade[];
  horarios: string[];
  whatsapp: string;
  bio: string;
  comentarios: { autor: string; nota: number; texto: string }[];
};

export const ESPECIALIDADES = [
  "Ansiedade",
  "Depressão",
  "TDAH",
  "TEA",
  "Relacionamentos",
  "Luto",
  "Autoestima",
  "Transtornos alimentares",
  "Estresse",
  "Burnout",
];

export const ABORDAGENS = ["Psicanálise", "TCC", "Humanista", "Gestalt", "Behaviorismo"];

export const MODALIDADES: Modalidade[] = ["Online", "Presencial"];

export const FAIXAS = [
  { id: "ate50", label: "Até R$50", min: 0, max: 50 },
  { id: "50-80", label: "R$50–80", min: 50, max: 80 },
  { id: "80-120", label: "R$80–120", min: 80, max: 120 },
  { id: "120+", label: "Acima de R$120", min: 120, max: Infinity },
];

export const ESTADOS = ["SP", "RJ", "MG", "BA", "RS", "PE", "PR", "CE"];

export const PSICOLOGOS: Psicologo[] = [
  {
    id: "maria-oliveira",
    nome: "Maria Oliveira",
    crp: "06/123456",
    cidade: "São Paulo",
    estado: "SP",
    preco: 110,
    nota: 4.9,
    pacientes: 320,
    anos: 9,
    formacao: "Psicologia — USP",
    abordagem: "TCC",
    especialidades: ["Ansiedade", "Burnout", "Autoestima"],
    especializacoes: ["Terapia Cognitivo-Comportamental", "Transtornos de Ansiedade"],
    modalidades: ["Online", "Presencial"],
    horarios: ["Seg 09h", "Ter 15h", "Qui 18h"],
    whatsapp: "5511999990001",
    bio: "Atendo adultos que buscam lidar com ansiedade, estresse e esgotamento profissional com um plano prático de cuidado.",
    comentarios: [
      { autor: "Camila R.", nota: 5, texto: "Acolhedora e muito objetiva. Mudou minha rotina." },
      { autor: "João P.", nota: 5, texto: "Me senti seguro desde a primeira sessão." },
    ],
  },
  {
    id: "rafael-souza",
    nome: "Rafael Souza",
    crp: "05/998877",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    preco: 75,
    nota: 4.7,
    pacientes: 210,
    anos: 6,
    formacao: "Psicologia — UFRJ",
    abordagem: "Psicanálise",
    especialidades: ["Depressão", "Luto", "Relacionamentos"],
    especializacoes: ["Clínica Psicanalítica", "Luto e Perdas"],
    modalidades: ["Online"],
    horarios: ["Seg 14h", "Qua 10h", "Sex 19h"],
    whatsapp: "5521999990002",
    bio: "Escuta cuidadosa para atravessar momentos de perda, tristeza e conflitos afetivos.",
    comentarios: [
      { autor: "Ana L.", nota: 5, texto: "Escuta genuína, sem julgamentos." },
      { autor: "Bruno M.", nota: 4, texto: "Sessões profundas e transformadoras." },
    ],
  },
  {
    id: "juliana-mendes",
    nome: "Juliana Mendes",
    crp: "04/445566",
    cidade: "Belo Horizonte",
    estado: "MG",
    preco: 48,
    nota: 4.8,
    pacientes: 145,
    anos: 4,
    formacao: "Psicologia — UFMG",
    abordagem: "Humanista",
    especialidades: ["Autoestima", "Ansiedade", "Relacionamentos"],
    especializacoes: ["Abordagem Centrada na Pessoa"],
    modalidades: ["Online", "Presencial"],
    horarios: ["Ter 08h", "Qui 13h", "Sáb 10h"],
    whatsapp: "5531999990003",
    bio: "Acredito no seu ritmo. Um espaço seguro para você se reconhecer e crescer.",
    comentarios: [{ autor: "Paula S.", nota: 5, texto: "Valor acessível e muito cuidado." }],
  },
  {
    id: "carlos-lima",
    nome: "Carlos Lima",
    crp: "03/223344",
    cidade: "Salvador",
    estado: "BA",
    preco: 95,
    nota: 4.6,
    pacientes: 260,
    anos: 11,
    formacao: "Psicologia — UFBA",
    abordagem: "Behaviorismo",
    especialidades: ["TDAH", "TEA", "Estresse"],
    especializacoes: ["Análise do Comportamento Aplicada (ABA)"],
    modalidades: ["Presencial"],
    horarios: ["Seg 11h", "Qua 16h"],
    whatsapp: "5571999990004",
    bio: "Trabalho com neurodivergência e desenvolvimento de habilidades no dia a dia.",
    comentarios: [{ autor: "Marcos T.", nota: 5, texto: "Ótimo com adolescentes." }],
  },
  {
    id: "beatriz-nunes",
    nome: "Beatriz Nunes",
    crp: "07/778899",
    cidade: "Porto Alegre",
    estado: "RS",
    preco: 140,
    nota: 5.0,
    pacientes: 410,
    anos: 14,
    formacao: "Psicologia — UFRGS",
    abordagem: "Gestalt",
    especialidades: ["Transtornos alimentares", "Autoestima", "Ansiedade"],
    especializacoes: ["Gestalt-terapia", "Imagem corporal"],
    modalidades: ["Online", "Presencial"],
    horarios: ["Ter 17h", "Qui 09h", "Sex 15h"],
    whatsapp: "5551999990005",
    bio: "Cuidado integral com a relação entre corpo, comida e emoções.",
    comentarios: [
      { autor: "Larissa D.", nota: 5, texto: "Profissional excepcional." },
      { autor: "Rita F.", nota: 5, texto: "Me ajudou a reconstruir minha autoestima." },
    ],
  },
  {
    id: "pedro-alcantara",
    nome: "Pedro Alcântara",
    crp: "02/112233",
    cidade: "Recife",
    estado: "PE",
    preco: 65,
    nota: 4.5,
    pacientes: 130,
    anos: 5,
    formacao: "Psicologia — UFPE",
    abordagem: "TCC",
    especialidades: ["Depressão", "Estresse", "TDAH"],
    especializacoes: ["TCC para adultos"],
    modalidades: ["Online"],
    horarios: ["Seg 19h", "Qua 20h"],
    whatsapp: "5581999990006",
    bio: "Ferramentas práticas para retomar energia, foco e rotina.",
    comentarios: [{ autor: "Igor V.", nota: 4, texto: "Muito pontual e organizado." }],
  },
];

export function iniciais(nome: string) {
  return nome
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}
