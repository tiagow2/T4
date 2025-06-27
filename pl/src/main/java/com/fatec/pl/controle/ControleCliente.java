package com.fatec.pl.controle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.pl.atualizador.AtualizadorCliente;
import com.fatec.pl.hateoas.HateoasCliente;
import com.fatec.pl.modelo.Cliente;
import com.fatec.pl.repositorio.RepositorioCliente;

@CrossOrigin
@RestController
public class ControleCliente {
	@Autowired
	private RepositorioCliente repositorio;
	@Autowired
	private HateoasCliente hateoas;
	@Autowired
	private AtualizadorCliente atualizador;

@GetMapping("/cliente/{id}")
public ResponseEntity<Cliente> obterCliente(@PathVariable Long id) {
    Cliente cliente = repositorio.findById(id).orElse(null);
    if (cliente != null) {
        hateoas.adicionarLink(cliente);
        return new ResponseEntity<>(cliente, HttpStatus.OK); // <- Alterado para 200
    } else {
        return new ResponseEntity<>(cliente, HttpStatus.OK); // ao invés de FOUND
    }
}

@GetMapping("/cliente/clientes")
public ResponseEntity<List<Cliente>> obterClientes() {
    List<Cliente> clientes = repositorio.findAll();
    hateoas.adicionarLink(clientes);
    return new ResponseEntity<>(clientes, HttpStatus.OK); // <- Alterado para 200
}


	@SuppressWarnings("deprecation")
	@PutMapping("/cliente/atualizar")
	public ResponseEntity<?> atualizarCliente(@RequestBody Cliente atualizacao) {
		HttpStatus status = HttpStatus.BAD_REQUEST;
		Cliente cliente = repositorio.getById(atualizacao.getId());
		if (cliente != null) {
			atualizador.atualizar(cliente, atualizacao);
			repositorio.save(cliente);
			status = HttpStatus.OK;
		}
		return new ResponseEntity<>(status);
	}

@PostMapping("/cliente/cadastrar")
public ResponseEntity<?> cadastrarCliente(@RequestBody Cliente novo) {
    try {
        repositorio.save(novo);
        return new ResponseEntity<>(HttpStatus.OK);
    } catch (Exception e) {
        e.printStackTrace(); // Mostra erro no console
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

	@SuppressWarnings("deprecation")
	@DeleteMapping("/cliente/excluir")
	public ResponseEntity<?> excluirCliente(@RequestBody Cliente exclusao) {
		Cliente cliente = repositorio.getById(exclusao.getId());
		if (cliente == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			repositorio.delete(cliente);
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}
}
