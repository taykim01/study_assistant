import { AIModel } from "@/types";

export default class KeywordModel {
   email: string;
  createdAt: Date;
  term: string;
  definition: string;
  example: string;
  // image_url: string;
  origin: string;
  model: AIModel;

  constructor(
     email: string,
    createdAt: Date,
    term: string,
    definition: string,
    example: string,
    // image_url: string,
    origin: string,
    model: AIModel
  ) {
    this. email =  email;
    this.createdAt = createdAt;
    this.term = term;
    this.definition = definition;
    this.example = example;
    // this.image_url = image_url;
    this.origin = origin;
    this.model = model;
  }

  toObject() {
    return {
       email: this. email,
      createdAt: this.createdAt,
      term: this.term,
      definition: this.definition,
      example: this.example,
      // image_url: this.image_url,
      origin: this.origin,
      model: this.model,
    };
  }
}
