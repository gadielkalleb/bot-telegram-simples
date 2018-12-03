# bot-telegram-simples

Eu tenho um serio Problema que é gastar pequenas quantias em dinheiro na rua(doces Salgados, etc), coisas que parecem besteira, mas no fim do mês soma uma valor considerável, e eu fico sem saber onde gastei, pois não tenho um controle desse gasto.

Ai pensei vou desenvolver uma API e um app, mas me tomaria um tempo(não quer dizer que não posso mas nesse momento preciso de algo rápido), nesse caso pensei em um bot.

Um bot é a mesma facilidade de eu manda uma mensagem para uma pessoa, e ele registra o valor e onde eu gastei. Pesando nesse principio criei um bot usando a API de bots do telegram e node.js, onde passo um comando /salvar valor onde-foi-gasto ele salva as informações em um banco de dados(nesse caso o MongoDB)

Para consultar eu criei um comando /exibir onde ele traz os últimos 5 registros junto com a data que foi gasto.

Com isso consigo usar o banco de dados pra gerar uma soma mensal de valor gasto.(vou implementar isso no meu bot futuramente),assim passo tudo para uma planilha com meus gastos mensais.
