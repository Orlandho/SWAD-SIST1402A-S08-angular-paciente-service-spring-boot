package com.upn.clinica;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.upn.clinica.model.Paciente;
import com.upn.clinica.repository.PacienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class PacienteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        pacienteRepository.deleteAll();
        pacienteRepository.save(new Paciente("Pérez Quispe Juan Carlos", 45, "72345678", "Crisis hipertensiva aguda", true, "Critico", "2026-10-10", "987654321"));
        pacienteRepository.save(new Paciente("Gómez Soto Ana María", 28, "45678901", "Cefalea migrañosa", true, "Medio", "2026-10-10", "912345678"));
        pacienteRepository.save(new Paciente("Mendoza Ruiz Carmen", 19, "71239845", "Contusión leve", true, "Bajo", "2026-10-10", "944332211"));
    }

    @Test
    @DisplayName("GET /api/pacientes retorna lista completa con HTTP 200")
    void testListarPacientes() throws Exception {
        mockMvc.perform(get("/api/pacientes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].dni", is("72345678")))
                .andExpect(jsonPath("$[0].triaje", is("Critico")));
    }

    @Test
    @DisplayName("GET /api/pacientes/{id} retorna paciente existente con HTTP 200")
    void testBuscarPorId() throws Exception {
        Paciente primero = pacienteRepository.findAll().get(0);

        mockMvc.perform(get("/api/pacientes/{id}", primero.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(primero.getId().intValue())))
                .andExpect(jsonPath("$.dni", is(primero.getDni())));
    }

    @Test
    @DisplayName("GET /api/pacientes/{id} retorna HTTP 404 para identificador inexistente")
    void testBuscarPorIdInexistente() throws Exception {
        mockMvc.perform(get("/api/pacientes/{id}", 9999L)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST /api/pacientes registra paciente y retorna HTTP 201 Created")
    void testRegistrarPaciente() throws Exception {
        Paciente nuevo = new Paciente("Alvarez Morales Jorge", 50, "11223344", "Neumonía bacteriana", true, "Critico", "2026-10-10", "933221100");

        mockMvc.perform(post("/api/pacientes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(nuevo)))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.nombre", is("Alvarez Morales Jorge")));
    }

    @Test
    @DisplayName("PUT /api/pacientes/{id} actualiza registro con HTTP 200")
    void testActualizarPaciente() throws Exception {
        Paciente primero = pacienteRepository.findAll().get(0);
        primero.setDiagnostico("Hipertensión estabilizada con medicación");

        mockMvc.perform(put("/api/pacientes/{id}", primero.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(primero)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.diagnostico", is("Hipertensión estabilizada con medicación")));
    }

    @Test
    @DisplayName("DELETE /api/pacientes/{id} elimina paciente y retorna HTTP 204")
    void testEliminarPaciente() throws Exception {
        Paciente primero = pacienteRepository.findAll().get(0);

        mockMvc.perform(delete("/api/pacientes/{id}", primero.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/pacientes/{id}", primero.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("GET /api/pacientes/triaje filtra por nivel con HTTP 200")
    void testFiltrarPorTriaje() throws Exception {
        mockMvc.perform(get("/api/pacientes/triaje")
                .param("triaje", "Critico")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].dni", is("72345678")));
    }
}
