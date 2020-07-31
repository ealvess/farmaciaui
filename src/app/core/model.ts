export class Fornecedor{
  codigo: number ;
	nomeFantasia: string;
	razaoSocial: string;
	cnpj: string;
	inscricaoEstadual: string;
	logradouro: string;
	numero: string;
	bairro: string;
	cep: string;
	cidade: string;
	estado: string;
	telefone: string;
	telefone2: string;
  telefone3: string;
  telefoneFax: string;
	email: string;
	ativo: boolean;
}

export class Categoria{
	codigo: number;
	nome: string;
	ativo: boolean;
}

export class Medicamento{
	codigo: number;
	nome: string;
	categoria = new Categoria();
	unidadeDeMedida: string;
	quantidadeMinima: number;
	localizacao: string;
	ativo: boolean;
}

export class EntradaMedicamento{
	codigo: number;
	dataEntrada: Date;
	fornecedor = new Fornecedor();
	numeroNotaFiscal: number;
	medicamento = new Medicamento();
	dataFabricacao: Date;
	validade: Date;
	lote: string;
	quantidade: number;
	valorUnitario: number;
}

export class CategoriaCorrelato{
	codigo: number;
	nome: string;
	ativo: boolean;
}

export class Correlato{
	codigo: number;
	nome: string;
	categoriaCorrelato = new CategoriaCorrelato();
	unidadeDeMedida: string;
	quantidadeMinima: number;
	localizacao: string;
	ativo: boolean;
}

export class EntradaCorrelato{
	codigo: number;
	correlato = new Correlato();
	dataEntrada: Date;
	fornecedor = new Fornecedor();
	numeroNotaFiscal: number;
	dataFabricacao: Date;
	dataValidade: Date;
	lote: string;
	quantidade: number;
	valorUnitario: number;
}

export class Medico{
	codigo: number;
	nome: string;
	cpf: number;
	rg: number;
	crm: string;
	dataInscricao: Date;
	email: string;
	telefone: number;
	celular: number;
	ativo: boolean;
}

export class Endereco{
	logradouro: string;
	numero: number;
	complemento: string;
	bairro: string;
	cep: number;
	cidade: string;
	estado: string;
}

export class Paciente{
	codigo: number;
	nome:string;
	cpf:string;
	rg: string;
	dataNascimento: Date;
	sexo: string;
	cartaoSus: number;
	endereco = new Endereco();
	
}