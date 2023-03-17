import { ChatGPTAPI } from 'chatgpt';
export class Chat {
  private chatAPI: ChatGPTAPI;

  constructor(apikey: string) {
    this.chatAPI = new ChatGPTAPI({
      apiKey: apikey,
      completionParams: {
        model: process.env.MODEL || 'gpt-3.5-turbo',
        temperature: +(process.env.temperature || 0) || 1,
        top_p: +(process.env.temperature || 0) || 1,
      },
    });
  }

  public codeReview = async (patch: string) => {
    if (!patch) {
      return '';
    }
    const systemMessage = "You are a professional Golang programmer reviewing the code patch and giving feedbacks focus only on potential bugs, format errors, if the commit message is enough to describe this patch and ways to improvement."

    console.time('code-review cost');
    const res = await this.chatAPI.sendMessage(patch, {systemMessage: systemMessage});
    console.timeEnd('code-review cost');
    return res.text;
  };
}
