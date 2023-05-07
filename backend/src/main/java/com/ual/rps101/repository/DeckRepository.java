package com.ual.rps101.repository;

import com.ual.rps101.entity.Deck;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface DeckRepository extends CrudRepository<Deck, Long> {
    public List<Deck> findByNameContainingIgnoreCase(@Param("name") String name);
}