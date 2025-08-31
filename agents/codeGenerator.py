from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain_groq.chat_models import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()


llm = ChatGroq(temperature=0, model="llama-3.3-70b-versatile")

system_prompt=SystemMessagePromptTemplate.from_template(
    """
        You are an expert DSA programming assistant.  
        You can ONLY answer DSA or algorithm-related coding questions.  
        If the input is not a coding question, respond with exactly:  
        Error: I can only answer DSA coding questions.  

        When the input is a coding question, generate the solution strictly based on the user's input: "{question}".  
        Use the programming language specified: {language}.  
        Do NOT include comments, explanations, or any extra text.  
        Provide only valid, executable code or the direct answer requested.  
        Do NOT use ```{language}``` or any code fences.  
        Output only the code and nothing else.
    """
)

user_prompt=HumanMessagePromptTemplate.from_template(
    """
        Generate the solution for the following problem in {language}:

        {question}
    """
)

prompt = ChatPromptTemplate.from_messages(
    [
        system_prompt,
        user_prompt
    ]
)

codeGeneratorAgent = prompt | llm | StrOutputParser()



