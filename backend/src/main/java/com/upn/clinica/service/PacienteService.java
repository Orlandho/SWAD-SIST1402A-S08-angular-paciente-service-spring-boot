package com.upn.clinica.service;

import com.upn.clinica.model.Paciente;
import com.upn.clinica.repository.PacienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    @Transactional(readOnly = true)
    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Paciente> buscarPorId(Long id) {
        return pacienteRepository.findById(id);
    }

    public Paciente registrar(Paciente paciente) {
        paciente.setId(null);
        if (paciente.getActivo() == null) {
            paciente.setActivo(true);
        }
        return pacienteRepository.save(paciente);
    }

    public Optional<Paciente> actualizar(Long id, Paciente pacienteActualizado) {
        return pacienteRepository.findById(id).map(existente -> {
            existente.setNombre(pacienteActualizado.getNombre());
            existente.setEdad(pacienteActualizado.getEdad());
            existente.setDni(pacienteActualizado.getDni());
            existente.setDiagnostico(pacienteActualizado.getDiagnostico());
            existente.setTriaje(pacienteActualizado.getTriaje());
            existente.setTelefono(pacienteActualizado.getTelefono());
            if (pacienteActualizado.getActivo() != null) {
                existente.setActivo(pacienteActualizado.getActivo());
            }
            return pacienteRepository.save(existente);
        });
    }

    public boolean eliminar(Long id) {
        return pacienteRepository.findById(id).map(p -> {
            pacienteRepository.delete(p);
            return true;
        }).orElse(false);
    }

    @Transactional(readOnly = true)
    public List<Paciente> filtrarPorTriaje(String triaje) {
        return pacienteRepository.findByTriajeIgnoreCase(triaje);
    }
}
