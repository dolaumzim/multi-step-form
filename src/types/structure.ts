export interface FormData {
    name: string;
    email: string;
    birthdate: string;
    phone: string;
    bio: string;
    links: string[];
    city_id: string;
  
    role: string;
    tech_ids: number[];
    ability_ids: number[];
    softskill_ids: number[];
  
    experiences_attributes: ExpProps[];
    studies_attributes: StudyProps[];
  }

  export interface ExpProps {
    title: string;
    company_name: string;
    start_date: string;
    function_performed: string;
    end_date?: string;
  }
  
  export interface StudyProps {
    title: string;
    institution: string;
    start_date: string;
    end_date?: string;
    link: string;
  }

  export const expInitial: ExpProps = {
    title: "",
    company_name: "",
    function_performed: "",
    start_date: "",
  };

  export const studyInitial: StudyProps = {
    title: "",
    institution: "",
    start_date: "",
    link: "",
  };

  export const initialValues: FormData = {
    name: "",
    email: "",
    birthdate: "",
    phone: "",
    bio: "",
    links: [""],
    city_id: "",

    role: "",
    tech_ids: [],
    ability_ids: [],
    softskill_ids: [],

    experiences_attributes: [expInitial],
    studies_attributes: [studyInitial],
  };