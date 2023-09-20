import React, { useEffect, useState } from "react";
import { StepForm } from "../StepForm";
import {
  ErrorMessage,
  Form,
  Formik,
  Field,
  FieldArray,
  FormikErrors,
} from "formik";
import * as Styled from "./styles";
import {
  api,
  getAbilities,
  getCities,
  getPDF,
  getSoftskills,
  getStates,
  getTechs,
} from "../../service/api";
import { useForm } from "../../contexts/FormContext";
import { FormData } from "../../types/structure";
import { dataSchema } from "../../service/schemas";

export const MultiStepForm = () => {
  const [states, setStates] = useState([] as any);
  const [cities, setCities] = useState([] as any);
  const [techs, setTechs] = useState([] as any);
  const [softskills, setSoftskills] = useState([] as any);
  const [abilities, setAbilities] = useState([] as any);
  const [profileId, setProfileId] = useState(0);
  const [hasStudies, setHasStudies] = useState(false);
  const [hasExperience, setHasExperience] = useState(false);
  const [hasPDF, setHasPDF] = useState(false);
  const [requestError, setRequestError] = useState(false);

  const { allData, setAllData, step, setStep } = useForm();

  const SoftAux: number[] = [0, 0, 0];

  const roles = [
    "FrontEnd",
    "BackEnd",
    "FullStack",
    "Mobile",
    "Designer",
    "QA",
  ];

  if (!hasStudies) allData.studies_attributes = [];
  if (!hasExperience) allData.experiences_attributes = [];

  const handleStateSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const response = await getCities(e.target.value);
    setCities(response);
  };

  const handleRoleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateRole(e, "role");
    const response = await getAbilities(e.target.value.toLowerCase());
    setAbilities(response);
  };

  const updateForm = (e: any, type: string) => {
    setAllData((allData) => ({
      ...allData,
      [type]: e.target.value,
    }));
  };

  const updateRole = (e: any, type: string) => {
    setAllData((allData) => ({
      ...allData,
      [type]: e.target.value.toLowerCase(),
    }));
  };

  const updateFormArrayEntry = (e: any, type: string) => {
    setAllData((allData) => ({
      ...allData,
      [type]: [Number(e.target.value)],
    }));
  };

  const updateFormLink = (e: any, type: string) => {
    const linkArray: string[] = [];
    const aux = e.target.value.replace(/[\r\n]/gm, "").split(";");
    for (let a of aux) linkArray.push(a);
    setAllData((allData) => ({
      ...allData,
      [type]: linkArray,
    }));
  };

  const handleOnClick = async () => {
    try {
      const pdf = await getPDF(profileId.toString());
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(new Blob([pdf]));
      link.setAttribute("download", ` - profile.pdf`);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const disabledOne = (errors: FormikErrors<FormData>) => {
    if (
      errors.name ||
      errors.email ||
      errors.bio ||
      errors.birthdate ||
      errors.phone ||
      errors.city_id
    ) {
      return true;
    }
    return false;
  };

  const disabledTwo = (errors: FormikErrors<FormData>) => {
    if (
      errors.role ||
      errors.ability_ids ||
      errors.tech_ids ||
      errors.softskill_ids
    ) {
      return true;
    }
    return false;
  };

  const disabledThree = (errors: FormikErrors<FormData>) => {
    if (errors.experiences_attributes || errors.studies_attributes) {
      return true;
    }
    return false;
  };

  const onSubmit = async (
    values: FormData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await api.post("/profiles", {
        profile: allData,
      });
      console.log("values", values);
      console.log("response", response);
      setProfileId(response.data.id);
      setHasPDF(true);
      setRequestError(false);
    } catch (error) {
      console.log(error);
      setHasPDF(false);
      setRequestError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const primaryRequisition = async () => {
    const stateResponse = await getStates();
    setStates(stateResponse);
    const techResponse = await getTechs();
    setTechs(techResponse);
    const softResponse = await getSoftskills();
    setSoftskills(softResponse);
  };

  useEffect(() => {
    primaryRequisition();
  }, []);

  switch (step) {
    case 1:
      return (
        <StepForm title="Informações Pessoais">
          <Styled.ImgDiv>
            <Styled.Charmander src="https://media.tenor.com/hLfJG3B_ZLIAAAAj/charmander-gif-pokemon.gif"></Styled.Charmander>
            <Styled.Pokeball src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5f321b49-5fa7-407b-aaa0-cca6992d3d7c/d5s04qj-d26a072a-3294-4da7-8ab9-a1be78141275.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi81ZjMyMWI0OS01ZmE3LTQwN2ItYWFhMC1jY2E2OTkyZDNkN2MvZDVzMDRxai1kMjZhMDcyYS0zMjk0LTRkYTctOGFiOS1hMWJlNzgxNDEyNzUuZ2lmIn1dXX0.hiDasOecg6-_ze0YZLGVbl4nKudKH9jPepKtZqUlS48"></Styled.Pokeball>
            <Styled.Pokeball src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5f321b49-5fa7-407b-aaa0-cca6992d3d7c/d5s04qj-d26a072a-3294-4da7-8ab9-a1be78141275.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi81ZjMyMWI0OS01ZmE3LTQwN2ItYWFhMC1jY2E2OTkyZDNkN2MvZDVzMDRxai1kMjZhMDcyYS0zMjk0LTRkYTctOGFiOS1hMWJlNzgxNDEyNzUuZ2lmIn1dXX0.hiDasOecg6-_ze0YZLGVbl4nKudKH9jPepKtZqUlS48"></Styled.Pokeball>
          </Styled.ImgDiv>

          <Formik<FormData>
            initialValues={allData}
            validateOnMount={true}
            onSubmit={onSubmit}
            validationSchema={dataSchema}
          >
            {({ setFieldValue, errors }) => (
              <Form>
                <Styled.Field>
                  <label htmlFor="name">Nome: </label>
                  <Field
                    value={allData.name}
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      updateForm(e, "name");
                      setFieldValue("name", e.target.value);
                    }}
                  />
                  <ErrorMessage name="name" />
                </Styled.Field>

                <Styled.Field>
                  <label htmlFor="email">E-mail: </label>
                  <Field
                    value={allData.email}
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      updateForm(e, "email");
                      setFieldValue("email", e.target.value);
                    }}
                  />
                  <ErrorMessage name="email" />
                </Styled.Field>

                <Styled.Field>
                  <label htmlFor="birthdate">Data de nascimento: </label>
                  <Field
                    value={allData.birthdate}
                    type="date"
                    name="birthdate"
                    placeholder="Digite seu e-mail"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      updateForm(e, "birthdate");
                      setFieldValue("birthdate", e.target.value);
                    }}
                  />
                  <ErrorMessage name="birthdate" />
                </Styled.Field>

                <Styled.Field>
                  <label htmlFor="phone">Telefone: </label>
                  <Field
                    value={allData.phone}
                    type="text"
                    maxlength="11"
                    name="phone"
                    placeholder="Digite seu telefone"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      updateForm(e, "phone");
                      setFieldValue("phone", e.target.value);
                    }}
                  />
                  <ErrorMessage name="bio" />
                </Styled.Field>

                <Styled.StateCity>
                  <Styled.Field style={{ width: "20%" }}>
                    <label htmlFor="state">Estado: </label>
                    <Field
                      as="select"
                      name="state"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        handleStateSelect(e);
                        setFieldValue("state", e.target.value);
                      }}
                    >
                      <option value="" hidden disabled selected>
                        Selecione seu Estado
                      </option>
                      {states.map((state: any) => (
                        <option key={state.id} value={state.id}>
                          {state.acronym}
                        </option>
                      ))}
                    </Field>
                  </Styled.Field>

                  <Styled.Field style={{ width: "80%" }}>
                    <label htmlFor="city_id">Cidade: </label>
                    <Field
                      value={allData.city_id}
                      as="select"
                      name="city_id"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        updateForm(e, "city_id");
                        setFieldValue("city_id", e.target.value);
                      }}
                    >
                      <option value="" hidden disabled selected>
                        Selecione sua Cidade
                      </option>
                      {cities.map((city: any) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="city_id" />
                  </Styled.Field>
                </Styled.StateCity>

                <Styled.Field>
                  <label htmlFor="bio">Biografia: </label>
                  <Field
                    as="textarea"
                    rows="4"
                    cols="40"
                    type="text"
                    name="bio"
                    placeholder="Digite sua história"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      updateForm(e, "bio");
                      setFieldValue("bio", e.target.value);
                    }}
                  />
                  <ErrorMessage name="bio" />
                </Styled.Field>

                <Styled.Field>
                  <label htmlFor="links">Links: </label>
                  <Field
                    as="textarea"
                    rows="4"
                    cols="40"
                    type="text"
                    name="links"
                    placeholder='Digite seus links utilizando ";" para separá-los'
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      updateFormLink(e, "links");
                      setFieldValue("links", e.target.value);
                    }}
                  />
                  <ErrorMessage name="links" />
                </Styled.Field>

                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Styled.Button
                    type="submit"
                    onClick={() => {
                      setStep((prev) => prev + 1);
                    }}
                    disabled={disabledOne(errors)}
                  >
                    Next
                  </Styled.Button>
                </div>
              </Form>
            )}
          </Formik>
        </StepForm>
      );

    case 2:
      return (
        <StepForm title="Competências">
          <Styled.ImgDiv>
            <Styled.Pokeball src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5f321b49-5fa7-407b-aaa0-cca6992d3d7c/d5s04qj-d26a072a-3294-4da7-8ab9-a1be78141275.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi81ZjMyMWI0OS01ZmE3LTQwN2ItYWFhMC1jY2E2OTkyZDNkN2MvZDVzMDRxai1kMjZhMDcyYS0zMjk0LTRkYTctOGFiOS1hMWJlNzgxNDEyNzUuZ2lmIn1dXX0.hiDasOecg6-_ze0YZLGVbl4nKudKH9jPepKtZqUlS48"></Styled.Pokeball>
            <Styled.Charmeleon src="https://media.tenor.com/fk9-MPwwo60AAAAj/pok%C3%A9mon-charmeleongif.gif"></Styled.Charmeleon>
            <Styled.Pokeball src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5f321b49-5fa7-407b-aaa0-cca6992d3d7c/d5s04qj-d26a072a-3294-4da7-8ab9-a1be78141275.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi81ZjMyMWI0OS01ZmE3LTQwN2ItYWFhMC1jY2E2OTkyZDNkN2MvZDVzMDRxai1kMjZhMDcyYS0zMjk0LTRkYTctOGFiOS1hMWJlNzgxNDEyNzUuZ2lmIn1dXX0.hiDasOecg6-_ze0YZLGVbl4nKudKH9jPepKtZqUlS48"></Styled.Pokeball>
          </Styled.ImgDiv>

          <Formik<FormData>
            initialValues={allData}
            onSubmit={onSubmit}
            validationSchema={dataSchema}
          >
            {({ values, setFieldValue, errors }) => (
              <Form>
                {/* Step 2 */}

                <Styled.Field>
                  <label htmlFor="role">Função: </label>
                  <Field
                    as="select"
                    name="role"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      handleRoleSelect(e);
                      setFieldValue("role", e.target.value);
                    }}
                  >
                    <option value="" hidden disabled selected>
                      Selecione o seu Papel
                    </option>
                    {roles.map((role: any) => (
                      <option key={role + role} value={role}>
                        {role}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="role" />
                </Styled.Field>

                <Styled.Field>
                  <label htmlFor="ability_ids">Competências: </label>

                  <FieldArray
                    name="ability_ids"
                    render={(arrayHelpers) => (
                      <div>
                        {values.ability_ids.map((_, index: number) => (
                          <div key={index}>
                            <Field
                              as="select"
                              name={`ability_ids[${index}]`}
                              value={values.ability_ids[index]}
                              onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>
                              ) => {
                                setFieldValue(
                                  `ability_ids[${index}]`,
                                  e.target.value
                                );
                              }}
                              onBlur={() => {
                                setAllData((allData) => ({
                                  ...allData,
                                  ability_ids: values.ability_ids,
                                }));
                              }}
                            >
                              {abilities.map((ability: any) => (
                                <option key={ability.id} value={ability.id}>
                                  {ability.name}
                                </option>
                              ))}
                              <option value="" hidden disabled selected>
                                Selecione uma Competência
                              </option>
                            </Field>

                            <Styled.Remove
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              X
                            </Styled.Remove>
                          </div>
                        ))}

                        <ErrorMessage name="ability_ids" />
                        <Styled.AddField
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Adicionar Competência
                        </Styled.AddField>
                      </div>
                    )}
                  />
                </Styled.Field>

                <Styled.Field>
                  <label htmlFor="tech_ids">Tecnologia: </label>
                  <Field
                    as="select"
                    name="tech_ids"
                    value={allData.tech_ids}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setFieldValue("tech_ids", e.target.value);
                      updateFormArrayEntry(e, "tech_ids");
                    }}
                  >
                    {techs.map((tech: any) => (
                      <option key={tech.id} value={tech.id}>
                        {tech.name}
                      </option>
                    ))}
                    <option value="" hidden disabled selected>
                      Selecione a Tecnologia
                    </option>
                  </Field>
                  <ErrorMessage name="tech_ids" />
                </Styled.Field>

                <Styled.Field>
                  <label htmlFor="softskill_ids">Softskills: </label>

                  <FieldArray
                    name="softskill_ids"
                    render={() => (
                      <div>
                        {SoftAux.map((_, index: number) => (
                          <div key={index}>
                            <Field
                              as="select"
                              name={`softskill_ids[${index}]`}
                              value={values.softskill_ids[index]}
                              onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>
                              ) => {
                                setFieldValue(
                                  `softskill_ids[${index}]`,
                                  e.target.value
                                );
                              }}
                              onBlur={() => {
                                setAllData((allData) => ({
                                  ...allData,
                                  softskill_ids: values.softskill_ids,
                                }));
                              }}
                            >
                              {softskills.map((skill: any) => (
                                <option key={skill.id} value={skill.id}>
                                  {skill.name}
                                </option>
                              ))}
                              <option value="" hidden disabled selected>
                                Selecione uma Softskill
                              </option>
                            </Field>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  <ErrorMessage name="softskill_ids" />
                </Styled.Field>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Styled.Button
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                  >
                    Back
                  </Styled.Button>
                  <Styled.Button
                    type="button"
                    disabled={disabledTwo(errors)}
                    onClick={() => setStep((prev) => prev + 1)}
                  >
                    Next
                  </Styled.Button>
                </div>
              </Form>
            )}
          </Formik>
        </StepForm>
      );

    case 3:
      return (
        <StepForm title="Experiências">
          <Styled.ImgDiv>
            <Styled.Pokeball src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5f321b49-5fa7-407b-aaa0-cca6992d3d7c/d5s04qj-d26a072a-3294-4da7-8ab9-a1be78141275.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi81ZjMyMWI0OS01ZmE3LTQwN2ItYWFhMC1jY2E2OTkyZDNkN2MvZDVzMDRxai1kMjZhMDcyYS0zMjk0LTRkYTctOGFiOS1hMWJlNzgxNDEyNzUuZ2lmIn1dXX0.hiDasOecg6-_ze0YZLGVbl4nKudKH9jPepKtZqUlS48"></Styled.Pokeball>
            <Styled.Pokeball src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5f321b49-5fa7-407b-aaa0-cca6992d3d7c/d5s04qj-d26a072a-3294-4da7-8ab9-a1be78141275.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi81ZjMyMWI0OS01ZmE3LTQwN2ItYWFhMC1jY2E2OTkyZDNkN2MvZDVzMDRxai1kMjZhMDcyYS0zMjk0LTRkYTctOGFiOS1hMWJlNzgxNDEyNzUuZ2lmIn1dXX0.hiDasOecg6-_ze0YZLGVbl4nKudKH9jPepKtZqUlS48"></Styled.Pokeball>
            <Styled.Charizard src="https://media.tenor.com/IpAyHtYc--gAAAAj/charizard-flying.gif"></Styled.Charizard>
          </Styled.ImgDiv>

          <Formik<FormData>
            initialValues={allData}
            onSubmit={onSubmit}
            validationSchema={dataSchema}
          >
            {({ values, setFieldValue, errors }) => (
              <Form>
                {/* Step 3 */}

                <Styled.Field>
                  <label htmlFor="experiences_attributes">
                    Possui Experiência Profissional?
                  </label>

                  <FieldArray
                    name="experiences_attributes"
                    render={(arrayHelpers) => (
                      <div>
                        <Field
                          type="text"
                          as="select"
                          name="hasExperience"
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            e.target.value === "Sim"
                              ? setHasExperience(true)
                              : setHasExperience(false)
                          }
                        >
                          <option value="Sim"> Sim </option>
                          <option value="Não" selected>
                            {" "}
                            Não{" "}
                          </option>
                        </Field>

                        {values.experiences_attributes.map(
                          (_, index: number) => (
                            <div key={index}>
                              <Styled.Field>
                                <label htmlFor="title">Título: </label>
                                <Field
                                  type="text"
                                  name={`experiences_attributes[${index}].title`}
                                  placeholder="Título"
                                  value={
                                    values.experiences_attributes[index].title
                                  }
                                  onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                  ) => {
                                    setFieldValue(
                                      `experiences_attributes[${index}].title`,
                                      e.target.value
                                    );
                                  }}
                                />
                                <ErrorMessage
                                  name={`experiences_attributes[${index}].title`}
                                />
                              </Styled.Field>

                              <Styled.Field>
                                <label htmlFor="company_name">
                                  Nome da Empresa:{" "}
                                </label>
                                <Field
                                  type="text"
                                  name={`experiences_attributes[${index}].company_name`}
                                  placeholder="Empresa"
                                  value={
                                    values.experiences_attributes[index]
                                      .company_name
                                  }
                                  onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                  ) => {
                                    setFieldValue(
                                      `experiences_attributes[${index}].company_name`,
                                      e.target.value
                                    );
                                  }}
                                />
                                <ErrorMessage
                                  name={`experiences_attributes[${index}].company_name`}
                                />
                              </Styled.Field>

                              <Styled.Field>
                                <label htmlFor="function_performed">
                                  Funções:{" "}
                                </label>
                                <Field
                                  type="text"
                                  name={`experiences_attributes[${index}].function_performed`}
                                  placeholder="Funções"
                                  value={
                                    values.experiences_attributes[index]
                                      .function_performed
                                  }
                                  onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                  ) => {
                                    setFieldValue(
                                      `experiences_attributes[${index}].function_performed`,
                                      e.target.value
                                    );
                                  }}
                                />
                                <ErrorMessage
                                  name={`experiences_attributes[${index}].function_performed`}
                                />
                              </Styled.Field>

                              <Styled.Field>
                                <label htmlFor="start_date">
                                  Data de Início:{" "}
                                </label>
                                <Field
                                  type="date"
                                  name={`experiences_attributes[${index}].start_date`}
                                  value={
                                    values.experiences_attributes[index]
                                      .start_date
                                  }
                                  onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                  ) => {
                                    setFieldValue(
                                      `experiences_attributes[${index}].start_date`,
                                      e.target.value
                                    );
                                  }}
                                />
                                <ErrorMessage
                                  name={`experiences_attributes[${index}].start_date`}
                                />
                              </Styled.Field>

                              <Styled.Field>
                                <label htmlFor="end_date">
                                  Data de Término:{" "}
                                </label>
                                <Field
                                  type="date"
                                  name={`experiences_attributes[${index}].end_date`}
                                  value={
                                    values.experiences_attributes[index]
                                      .end_date
                                  }
                                  onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                  ) => {
                                    setFieldValue(
                                      `experiences_attributes[${index}].end_date`,
                                      e.target.value
                                    );
                                  }}
                                />
                              </Styled.Field>

                              <button
                                type="button"
                                onClick={() => {
                                  setAllData((allData) => ({
                                    ...allData,
                                    experiences_attributes:
                                      values.experiences_attributes,
                                  }));
                                }}
                              >
                                OK
                              </button>

                              <Styled.Remove
                                type="button"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                  delete allData.experiences_attributes[index];
                                }}
                              >
                                X
                              </Styled.Remove>
                            </div>
                          )
                        )}
                        <br />
                        {hasExperience ? (
                          <Styled.AddField
                            type="button"
                            onClick={() =>
                              arrayHelpers.push({
                                title: "",
                                company_name: "",
                                function_performed: "",
                                start_date: "",
                                end_date: "",
                              })
                            }
                          >
                            Adicionar Experiência
                          </Styled.AddField>
                        ) : null}
                      </div>
                    )}
                  />
                </Styled.Field>

                <Styled.Field>
                  <label htmlFor="studies_attributes">
                    Possui Experiência Educacional?
                  </label>

                  <FieldArray
                    name="studies_attributes"
                    render={(arrayHelpers) => (
                      <div>
                        <Field
                          type="text"
                          as="select"
                          name="hasStudies"
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            e.target.value === "Sim"
                              ? setHasStudies(true)
                              : setHasStudies(false)
                          }
                        >
                          <option value="Sim"> Sim </option>
                          <option value="Não" selected>
                            {" "}
                            Não{" "}
                          </option>
                        </Field>
                        {values.studies_attributes.map((_, index: number) => (
                          <div key={index}>
                            <Styled.Field>
                              <label htmlFor="title">Título: </label>
                              <Field
                                type="text"
                                name={`studies_attributes[${index}].title`}
                                placeholder="Título"
                                value={values.studies_attributes[index].title}
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  setFieldValue(
                                    `studies_attributes[${index}].title`,
                                    e.target.value
                                  );
                                }}
                              />
                              <ErrorMessage
                                name={`studies_attributes[${index}].title`}
                              />
                            </Styled.Field>

                            <Styled.Field>
                              <label htmlFor="institution">Instituição: </label>
                              <Field
                                type="text"
                                name={`studies_attributes[${index}].institution`}
                                placeholder="Instituição"
                                value={
                                  values.studies_attributes[index].institution
                                }
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  setFieldValue(
                                    `studies_attributes[${index}].institution`,
                                    e.target.value
                                  );
                                }}
                              />
                              <ErrorMessage
                                name={`studies_attributes[${index}].institution`}
                              />
                            </Styled.Field>

                            <Styled.Field>
                              <label htmlFor="link">Link: </label>
                              <Field
                                type="text"
                                name={`studies_attributes[${index}].link`}
                                placeholder="Link"
                                value={values.studies_attributes[index].link}
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  setFieldValue(
                                    `studies_attributes[${index}].link`,
                                    e.target.value
                                  );
                                }}
                              />
                              <ErrorMessage
                                name={`studies_attributes[${index}].link`}
                              />
                            </Styled.Field>

                            <Styled.Field>
                              <label htmlFor="start_date">
                                Data de Início:{" "}
                              </label>
                              <Field
                                type="date"
                                name={`studies_attributes[${index}].start_date`}
                                placeholder="Data de Início"
                                value={
                                  values.studies_attributes[index].start_date
                                }
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  setFieldValue(
                                    `studies_attributes[${index}].start_date`,
                                    e.target.value
                                  );
                                }}
                              />
                              <ErrorMessage
                                name={`studies_attributes[${index}].start_date`}
                              />
                            </Styled.Field>

                            <Styled.Field>
                              <label htmlFor="end_date">
                                Data de Término:{" "}
                              </label>
                              <Field
                                type="date"
                                name={`studies_attributes[${index}].end_date`}
                                placeholder="Data de Término"
                                value={
                                  values.studies_attributes[index].end_date
                                }
                                onChange={(
                                  e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                  setFieldValue(
                                    `studies_attributes[${index}].end_date`,
                                    e.target.value
                                  );
                                }}
                              />
                            </Styled.Field>

                            <Styled.Add
                              type="button"
                              onClick={() => {
                                setAllData((allData) => ({
                                  ...allData,
                                  studies_attributes: values.studies_attributes,
                                }));
                              }}
                            >
                              OK
                            </Styled.Add>

                            <Styled.Remove
                              type="button"
                              onClick={() => {
                                arrayHelpers.remove(index);
                                delete allData.studies_attributes[index];
                              }}
                            >
                              X
                            </Styled.Remove>
                          </div>
                        ))}
                        <br />
                        {hasStudies ? (
                          <Styled.AddField
                            type="button"
                            onClick={() =>
                              arrayHelpers.push({
                                institution: "",
                                link: "",
                                start_date: "",
                                end_date: "",
                              })
                            }
                          >
                            Adicionar Experiência
                          </Styled.AddField>
                        ) : null}
                      </div>
                    )}
                  />
                </Styled.Field>

                <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Styled.Button
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                  >
                    Back
                  </Styled.Button>

                  <Styled.Submit type="submit" disabled={disabledThree(errors)}>
                    Enviar
                  </Styled.Submit>
                </div>
              </Form>
            )}
          </Formik>
          <br />
          {requestError ? (
            <span style={{ color: "red" }}>
              {" "}
              Erro de requisição, tente novamente mais tarde
            </span>
          ) : null}

          <Styled.PDF disabled={!hasPDF} onClick={handleOnClick}>
            Baixar PDF
          </Styled.PDF>
        </StepForm>
      );
    default:
      return null;
  }
};
