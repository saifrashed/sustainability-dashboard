package com.sustainability.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.sustainability.models.ERole;
import com.sustainability.models.Role;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
