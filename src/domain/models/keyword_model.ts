import { AIModel } from "@/types";

export default class KeywordModel {
  createdAt: Date;
  term: string;
  definition: string;
  // example: string;
  // image_url: string;
  // origin: string;
  model: AIModel;
  starBool: boolean;

  constructor(
    createdAt: Date,
    term: string,
    definition: string,
    // example: string,
    // image_url: string,
    // origin: string,
    model: AIModel,
    starBool: boolean,
  ) {
    this.createdAt = createdAt;
    this.term = term;
    this.definition = definition;
    // this.example = example;
    // this.image_url = image_url;
    // this.origin = origin;
    this.model = model;
    this.starBool = starBool;
  }

  toObject() {
    return {
      createdAt: this.createdAt,
      term: this.term,
      definition: this.definition,
      // example: this.example,
      // image_url: this.image_url,
      // origin: this.origin,
      model: this.model,
      starBool: this.starBool,
    };
  }
}
