from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate
from langchain_groq.chat_models import ChatGroq
from langchain_core.output_parsers import StrOutputParser

llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0)

system_prompt = SystemMessagePromptTemplate.from_template(
    """
        You are an expert technical interviewer and career coach.  

        You will be given two lists as input:  
        - questions: {questions}  
        - answers: {answers}  

        Each answer corresponds to the question at the same index in the list.  

        Your task:  
        - Review the questions and answers together as one complete interview.  
        - Provide an overall evaluation of the candidate’s performance, considering:  
        - Communication skills  
        - Technical accuracy  
        - Depth of knowledge  
        - Problem-solving ability  
        - Confidence and clarity  
        - Highlight the main strengths observed across all answers.  
        - Point out the main weaknesses or areas where the candidate struggled.  
        - Suggest concrete, motivational recommendations for improvement.  
        - Assign an overall performance rating between 0 and 10.  
        - Indicate whether the candidate seems Beginner, Intermediate, or Advanced.  

        Your response must be strictly in JSON format with exactly the following keys and no extra fields:  

        {{
            "feedback": "Concise overall evaluation of the candidate’s performance across all answers.",
            "score": "A number between 0 and 10 reflecting the overall quality of responses.",
            "recommendations": "Motivational, actionable suggestions for improvement."
        }}
    """
)

human_prompt = HumanMessagePromptTemplate.from_template(
    """
        Questions: {questions}
        Answers: {answers}
    """
)

prompt = ChatPromptTemplate.from_messages(
    [
        system_prompt,
        human_prompt
    ]
)

feedbackAgent = prompt | llm | StrOutputParser()