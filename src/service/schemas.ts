import * as Yup from "yup";

export const expSchema = Yup.object().shape({
title: Yup.string().required("Título é obrigatório"),
company_name: Yup.string().required("Empresa é obrigatória"),
start_date: Yup.string()
    .required("Data de Início é obrigatória")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido (YYYY-MM-DD)"),
function_performed: Yup.string().required("Função é obrigatória"),
});

const studySchema = Yup.object().shape({
title: Yup.string().required("Título é obrigatório"),
institution: Yup.string().required("Instituição é obrigatória"),
start_date: Yup.string()
    .required("Data de início é obrigatória")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido (YYYY-MM-DD)"),
link: Yup.string().url("Formato do link incorreto"),
});

export const dataSchema = Yup.object().shape({
name: Yup.string()
    .min(4, "O nome deve ter no mínimo 4 caracteres")
    .required("Nome é um campo obrigatório"),
email: Yup.string()
    .email("Por favor, digite um e-mail válido")
    .required("E-mail é um campo obrigatório"),
birthdate: Yup.string()
    .required("Data de nascimento é obrigatória")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido (YYYY-MM-DD)"),
phone: Yup.string()
    .required("O campo telefone é obrigatório")
    .matches(/^\d{11}$/, "Telefone deve conter exatamente 11 dígitos")
    .matches(/^\d+$/, "Telefone deve conter apenas números"),
bio: Yup.string()
.min(50, "Biografia deve ter pelo menos 50 caracteres")
.required("Biografia é obrigatória"),
city_id: Yup.string().required("Cidade é um campo obrigatório"),
link: Yup.string(),

role: Yup.string().required("Cargo é obrigatório"),
tech_ids: Yup.string()
    .typeError("Tecnologia é obrigatória")
    .required("Tecnologia é obrigatória"),
ability_ids: Yup.array().test(
    "Vazio",
    "Competência é obrigatória",
    (value) => value && value?.length > 0
),
softskill_ids: Yup.array().test(
    "Vazio",
    "São necessárias 3 Softskills",
    (value) => value && value?.length > 2
),

experiences_attributes: Yup.array().of(expSchema),
studies_attributes: Yup.array().of(studySchema),
});