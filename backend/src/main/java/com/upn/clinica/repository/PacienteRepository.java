package com.upn.clinica.repository;

import com.upn.clinica.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    List<Paciente> findByTriajeIgnoreCase(String triaje);

    Optional<Paciente> findByDni(String dni);

    List<Paciente> findByActivoTrue();
}
