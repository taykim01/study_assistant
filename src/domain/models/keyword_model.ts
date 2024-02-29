import { AIModel } from "@/types";

export default class KeywordModel {
  createdAt: Date;
  term: string;
  definition: string;
  // example: string;
  // image_url: string;
  // origin: string;
  model: AIModel;

  constructor(
    createdAt: Date,
    term: string,
    definition: string,
    // example: string,
    // image_url: string,
    // origin: string,
    model: AIModel
  ) {
    this.createdAt = createdAt;
    this.term = term;
    this.definition = definition;
    // this.example = example;
    // this.image_url = image_url;
    // this.origin = origin;
    this.model = model;
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
    };
  }
}
