function result = get_PSO( max_iteration, num_of_particle )
    cost_log = [];
    
    w=1;                % Inertia Weight
    wdamp=0.99;         % Inertia Weight Damping Ratio
    c1=1.5;             % Personal Learning Coefficient
    c2=1.5;             % Global Learning Coefficient

    upper_bound = [20];
    lower_bound = [0];

    velMax = (upper_bound-lower_bound) * 0.1;

    empty_particle.value.y = [];
    empty_particle.value.Qr = [];
    empty_particle.value.Qw = [];
    empty_particle.value.Rr = [];
    empty_particle.value.Rw = [];
    empty_particle.velocity = [];
    empty_particle.cost = inf;
    empty_particle.best.value = [];
    empty_particle.best.cost = inf;

    global_best = empty_particle;

    particle = repmat(empty_particle, num_of_particle, 1);

    % initialization
    for i = 1:num_of_particle
        for j = 1:length(upper_bound)
            particle(i).value(j) = random(lower_bound(j), upper_bound(j));
            particle(i).velocity(j) = random(-velMax(j),velMax(j));
        end
        particle(i).cost = RA(particle(i).value);
        particle(i).best.value = particle(i).value;
        particle(i).best.cost = particle(i).cost;

        if (particle(i).cost < global_best.cost)
            global_best = particle(i);
        end

    end

    %% Main loop
    for iteration = 1:max_iteration
        for i = 1:num_of_particle
            % Update Velocity
            particle(i).velocity = w * particle(i).velocity...
                + c1 * rand(size(upper_bound)) .* (particle(i).best.value - particle(i).value)...
                + c2 * rand(size(upper_bound)) .* (global_best.value - particle(i).value);
            % Update velocity bound (velMax)
            particle(i).velocity = max(particle(i).velocity,-velMax);
            particle(i).velocity = min(particle(i).velocity,velMax);
            %Update value
            particle(i).value = particle(i).value + particle(i).velocity;
            particle(i).cost = RA(particle(i).value);
            %Update value bound
            particle(i).value = max(particle(i).value, lower_bound);
            particle(i).value = min(particle(i).value, upper_bound);

            %update personal best
            if particle(i).cost < particle(i).best.cost
                particle(i).best.cost = particle(i).cost;
                particle(i).best.value = particle(i).value;
                %update global best
                if particle(i).best.cost < global_best.cost
                    global_best.cost = particle(i).best.cost;
                    global_best.value = particle(i).best.value;
                end
            end
        end
        cost_log(end+1) = global_best.cost;
%         plot(cost_log);
        w=w*wdamp;
%         drawnow;
    end

%     disp(['Minimum RA = ' num2str(global_best.cost)]);
    result = global_best;
end

