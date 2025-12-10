gerar = function () { //salva o valor do radio button da página HTML e o usa como parâmetro para chamar a
    const rbs = document.querySelectorAll('input[name="trabalho"]');    //função que efetivamente cria o documento
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
    generatepdf(selectedValue); //documento PDF é criado
};
checar = function () { //confere se todos os campos obrigatórios foram preenchidos
    let allAreFilled = true;
    document.getElementById("meuForm").querySelectorAll("[required]").forEach(function(i) {
    if (!allAreFilled) return;
    if (!i.value) allAreFilled = false;
    if (i.type === "radio") {
        let radioValueCheck = false;
        document.getElementById("meuForm").querySelectorAll(`[name=${i.name}]`).forEach(function(r) {
            if (r.checked) radioValueCheck = true;
            })
            allAreFilled = radioValueCheck;
        }
    })
    if (!allAreFilled) {
        alert('Preencha todos os campos'); //caso não, alerta o usuário
    }
    else{
        gerar(); //caso sim, chama a função que efetivamente cria o documentos
    }
};
function generatepdf(selectedValue) {
    titulo = document.getElementById("titulo_t").value; //recebe os valores da página HTML (33-48)
    sub_t = document.getElementById("subt").value;
    trabalho = selectedValue;
    c_cutter = document.getElementById("c_cutter").value;
    projeto = document.getElementById("projeto").value;
    norientador = document.getElementById("n_orientador").value;
    sorientador = document.getElementById("s_orientador").value;
    ncoorientador = document.getElementById("ncoorientador").value;
    scoorientador = document.getElementById("scoorientador").value;
    cidadeCampus = document.getElementById("campus").value;
    ano = document.getElementById("ano_defesa").value;
    folhas = document.getElementById("n_folhas").value;
    assunto1 = document.getElementById("assunto1").value;
    assunto2 = document.getElementById("assunto2").value;
    assunto3 = document.getElementById("assunto3").value;
    assunto4 = document.getElementById("assunto4").value;
    assunto5 = document.getElementById("assunto5").value;

    cidade = document.getElementById("campus").value; //Como o nome da cidade e do Campus são diferentes
    if(cidade == "Avançado Arapongas"){               //esta parte separa os nomes das cidades do 
        cidade = "Arapongas";                         //"Campus Avançado" nos casos necessários
    }
    else if (cidade == "Avançado Astorga"){
        cidade = "Astorga";
    }
    else if (cidade == "Avançado Barracão"){
        cidade = "Barracão";
    }
    else if (cidade == "Avançado Coronel Vivida"){
        cidade = "Coronel Vivida";
    }
    else if (cidade == "Avançado Goioerê"){
        cidade = "Goioerê";
    }
    else if (cidade == "Avançado Quedas do Iguaçu"){
        cidade = "Quedas do Iguaçu";
    }
    else{
        cidade = cidadeCampus;
    }

    var doc = new jsPDF({orientation: 'portrait', unit: 'mm', lineHeight: 1.0}); //cria o documento PDF
                        //orientação: retrato, unidade de medida: milimetro, tamanho da linha: 1.0

    var textArea = document.getElementById("nomes"); //recebe os valores da Área de texto

    var nomes = textArea.value.split("\n"); //separa os valores em uma Array 
    
    var verif = nomes.length;               //variável de verificação, para conferir se existe mais de um autor

    if(verif == 1){

        var dados_publicacao = titulo;
        
        var nome_sobrenome = []; //Array que contém os nomes dos autores

        var cont = 0;

        for(var i = 0; i < nomes.length; i++){ //separa o nome e sobrenome em dois valores
            var j = nomes[i].search(", ");
            nome_sobrenome[cont] = nomes[i].slice(0, j);
            nome_sobrenome[cont+1] = nomes[i].slice(j+2);
            cont += 2;
        }
        //essa parte do código está presente nos três casos (linha 84-95)

        if (sub_t != ""){ //confere a existência de subtítulo
            dados_publicacao += ": " + sub_t + " / " + nome_sobrenome[0] + " " + nome_sobrenome[1] + "; ";
        }
        else{
            dados_publicacao += " / " + nome_sobrenome[0] + " " + nome_sobrenome[1] + "; ";
        }

        var nfolhas = folhas + " f."; //número de páginas do trabalho

        var orientacao = sorientador + ", " + norientador + ", orient. III. Título";
                                    //no caso de ser apenas um autor, os orientadores sempre ficarão como II e III
        if(ncoorientador != ""){
            orientacao = sorientador + ", " + norientador + " III. " + scoorientador + ", " + ncoorientador +", coorient. IV. Título";
        }

        var orientadores = "orientador(a) " + norientador + " " + sorientador;
        
        if(ncoorientador != ""){ //confere a existência de um coorientador
            orientadores = orientadores + ";  coorientador(a) " + ncoorientador + " " + scoorientador;
        }

        var programaMD = trabalho + " - " + projeto + ")";
        
        if(projeto == ""){ //caso haja um programa, adiciona os dados
            programaMD = trabalho + ")";
        }
        
        var fim_pt1 = "1. " + assunto1 + ". " + "2. " + assunto2 + ". " + "3. " + assunto3 + ". ";
        if (assunto4 != "") {               //variável que define os assuntos do trabalho e confere se há no mínimo 3 e máximo 5
            fim_pt1 += "4. " + assunto4 + ". ";
            if (assunto5 != "") {
                fim_pt1 += "5. " + assunto5 + " ";
            }
        }

        var maxLineWidth = 85,
        texto = nome_sobrenome[1] + ", " + nome_sobrenome[0] + "\n" + "\0\0\0\0\0\0\0" + dados_publicacao +
            orientadores + ". -- " + cidade + ", " + ano + "." + "\n" + "\0\0\0\0\0\0\0" + nfolhas + "\n\n" + "\0\0\0\0\0\0\0" 
            + programaMD + " -- Instituto Federal do Paraná, Campus " + cidadeCampus + ", " + ano + "." + "\n\n" +
            "\0\0\0\0\0\0\0" + fim_pt1 + ". I. " + nome_sobrenome[1] + ", " + nome_sobrenome[0] + " II. " + orientacao;
            //construção do texto impresso
    }

    //a estrutura do código se repete
    //altera somente as disposições dos nomes para mais de um autor

    else if(verif > 1 && verif <=3){

        var dados_publicacao = titulo;
        
        var nome_sobrenome = [];

        var cont = 0;

        for(var i = 0; i < nomes.length; i++){
            var j = nomes[i].search(", ");
            nome_sobrenome[cont] = nomes[i].slice(0, j);
            nome_sobrenome[cont+1] = nomes[i].slice(j+2);
            cont += 2;
        }
        
        if (sub_t != ""){
            dados_publicacao += ": " + sub_t + " /";
        }
        else{
            dados_publicacao += " /";
        }
        for(var i = 0; i < nome_sobrenome.length; i++){
            dados_publicacao += " " + nome_sobrenome[i] + " " + nome_sobrenome[i+1] + ";";
            i += 1;
        }
        if(ncoorientador != ""){
            dados_publicacao += " orientador " + norientador + " " + sorientador + "; coorientador " + ncoorientador + " " + scoorientador + ". -- ";
        }
        else{
            dados_publicacao += " orientador " + norientador + " " + sorientador + ". -- ";
        }

        var nfolhas = folhas + " f.";

        var programaMD = trabalho + " - " + projeto + ")";
        
        if(projeto == ""){
            programaMD = trabalho + ")";
        }

        var fim_pt2 = "I.";

        var quantidade = ["I.", "", " II.", "" ," III.", "" ," IV.", "" ," V.", "" ," VI.", "" ," VII.", "" ," VIII.", "" ," IX.", "" ," X.", "" ," XI.", "", " XII.", "", " XIII.", "", " XIV.", "", " XV."];
        
        var j = 0;
        for(var i = 0; i < nome_sobrenome.length; i++){
            fim_pt2 += " " + nome_sobrenome[i+1] + ", " + nome_sobrenome[i] + "." + quantidade[i+2];
            j = i;
            i += 1;
        }
        if(ncoorientador != ""){
        fim_pt2 += " " + sorientador + ", " + norientador + ", orient." + quantidade[j+4] + " " + scoorientador + ", " + ncoorientador + ", coorient." + quantidade[j+6] + " Título.";
        }
        else{
        fim_pt2 += " " + sorientador + ", " + norientador + ", orient." + quantidade[j+4] + " Título."
        }
        
        var fim_pt1 = "1. " + assunto1 + ". " + "2. " + assunto2 + ". " + "3. " + assunto3 + ". ";
        if (assunto4 != "") {
            fim_pt1 += "4. " + assunto4 + ". ";
            if (assunto5 != "") {
                fim_pt1 += "5. " + assunto5 + ". ";
            }
        }
        
            var maxLineWidth = 85,
            texto = nome_sobrenome[1] + ", " + nome_sobrenome[0] + "\n" + "\0\0\0\0\0\0\0" + dados_publicacao +
                cidade + ", " + ano + "." + "\n" + "\0\0\0\0\0\0\0" + nfolhas + "\n\n" + "\0\0\0\0\0\0\0" + programaMD +
                " -- Instituto Federal do Paraná, Campus " + cidadeCampus + ", " + ano + "." + "\n\n" + "\0\0\0\0\0\0\0" +
                fim_pt1 + " " + fim_pt2;
        }
    
    else{

        var dados_publicacao = titulo;
        
        var nome_sobrenome = [];

        var cont = 0;

        for(var i = 0; i < nomes.length; i++){
            var j = nomes[i].search(", ");
            nome_sobrenome[cont] = nomes[i].slice(0, j);
            nome_sobrenome[cont+1] = nomes[i].slice(j+2);
            cont += 2;
        }

        if (sub_t != ""){
            dados_publicacao += ": " + sub_t + " / " + nome_sobrenome[0] + " " + nome_sobrenome[1] + "...[et al.];";
            if(ncoorientador != ""){
                dados_publicacao += " orientador " + norientador + " " + sorientador + "; coorientador " + ncoorientador + " " + scoorientador + ". -- ";
            }
            else{
                dados_publicacao += " orientador " + norientador + " " + sorientador + ". -- ";
            }
        }
        else{
            dados_publicacao += " / " + nome_sobrenome[0] + " " + nome_sobrenome[1] + "...[et al.];";
            if(ncoorientador != ""){
                dados_publicacao += " orientador " + norientador + " " + sorientador + "; coorientador " + ncoorientador + " " + scoorientador + ". -- ";
            }
            else{
                dados_publicacao += " orientador " + norientador + " " + sorientador + ". -- ";
            }
        }
        
        var nfolhas = folhas + " f.";

        var programaMD = trabalho + " - " + projeto + ")";
        
        if(projeto == ""){
            programaMD = trabalho + ")";
        }

        var fim_pt2 = "I."; 

        var quantidade = ["I.", "", " II.", "" ," III.", "" ," IV.", "" ," V.", "" ," VI.", "" ," VII.", "" ," VIII.", "" ," IX.", "" ," X.", "" ," XI.", "", " XII.", "", " XIII.", "", " XIV.", "", " XV."];
        
        for(var i = 0; i < nome_sobrenome.length; i++){
                fim_pt2 += " " + nome_sobrenome[i+1] + ", " + nome_sobrenome[i] + "." + quantidade[i+2];
                i += 1;
        }
        if(ncoorientador != ""){
            fim_pt2 += " " + sorientador + ", " + norientador + ", orient." + quantidade[i+2] + " " + scoorientador + ", " + ncoorientador + ", coorient." + quantidade[i+4] + " Título";
        }
        else{
            fim_pt2 += " " + sorientador + ", " + norientador + ", orient." + quantidade[i+2] + " Título";
        }
        
        var fim_pt1 = "1. " + assunto1 + ". " + "2. " + assunto2 + ". " + "3. " + assunto3 + ". ";
        if (assunto4 != "") {
            fim_pt1 += "4. " + assunto4 + ". ";
            if (assunto5 != "") {
                fim_pt1 += "5. " + assunto5 + " ";
            }
        }
        
        var maxLineWidth = 85,
        texto = "\0\0\0\0\0\0\0" + dados_publicacao + cidade + ", " + ano + "." + "\n" + 
            "\0\0\0\0\0\0\0" + nfolhas + "\n\n" + "\0\0\0\0\0\0\0" + programaMD + " -- Instituto Federal do Paraná, Campus "
            + cidadeCampus + ", " + ano + "." + "\n\n" + "\0\0\0\0\0\0\0" + fim_pt1 + " " + fim_pt2;
    }

    var autoria = "Ficha catalográfica automática da biblioteca do IFPR\n" + //váriavel com as informações sobre o gerador de ficha catalográfica automático
        "DADOS FORNECIDOS PELO(A) AUTOR(A)"; //IMPORTANTE!!! NÃO REMOVER!!!

    var criacao = "Responsável pela estrutura de catalogação da publicação de acordo com a AACR2:\n" +
                "Daiana Ellen Canato - CRB 9/1930\n" +
                "Jefferson Nogueira de Oliveira - Desenvolvedor\n" +
                "Leonardo J. Rossoni Quadros - Desenvolvedor\n" +
                "Wellison Vieira Custer - Desenvolvedor";

    var textLines = doc //define o estilo e tamanho da fonte e define o tamanho máximo da linha que o texto irá ocupar
        .setFont("times")
        .setFontSize(10)
        .splitTextToSize(texto, maxLineWidth);

    var cutter = doc //define o estilo e tamanho da fonte e define o tamanho máximo da linha que o texto irá ocupar
        .setFont("times")
        .setFontSize(10)
        .splitTextToSize(c_cutter, maxLineWidth);

    
    var dado_fornecidos = doc.splitTextToSize(autoria, 210); //centraliza o texto que fica fora do retângulo

    var dev = doc.splitTextToSize(criacao, 210);

    doc.text(cutter, 45, 206); //define a posição do texto que ficará dentro do retângulo
    doc.text(textLines, 62.5, 206); 
    doc.text(dado_fornecidos, 105, 196, 'center'); //define a posição do texto que ficará fora do retângulo
    doc.text(dev, 105, 282, 'center');
    doc.rect(42.5, 201, 125, 77); //cria o retângulo

    doc.save('fichacatalografica.pdf'); //comando para salvar o documento PDF
    //opcional para realização de testes: console.log("fichacatalografica");
}